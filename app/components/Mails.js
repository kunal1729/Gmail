"use client"
import React, { useLayoutEffect } from 'react'
import Pagination from './Pagination'
import { Tooltip } from '@mui/material'
import { useState } from 'react'
import MailByCategory from './MailByCategory'
import Footer from './Footer'
import { useEffect } from 'react'
import axios from 'axios'
import FilterInbox from './FilterInbox'
import FilterSent from './FilterSent'

const Mails = ({type}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [selectAll, setSelectAll] = useState(false) 
  const [isSelected, setIsSelected] = useState(false)
  const [selectedIds, setSelectedIds] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [starred, setStarred] = useState([]);
  const [snoozed, setSnoozed] = useState([]);
  const [sent, setSent] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [spam, setSpam] = useState([]);
  const [archived, setArchived] = useState([]);
//   const [isStarred , setisStarred] = useState(second)
  
  const [trash, setTrash] = useState([])
  const [checklist, setChecklist] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredInbox, setFilteredInbox] = useState([]);
  const [filteredSent, setFilteredSent] = useState([]);
  
  const emailCategories = [
    { category : 'Inbox' },
    { category : 'Starred' },
    { category : 'Snoozed' },
    { category : 'Sent' },
    { category: 'Drafts' },
    { category: 'Spam' },
    { category: 'Archived' },
    { category: 'Trash' }
  ];

  const categoryMap = {
    Inbox: setInbox,
    Starred: setStarred,
    Snoozed: setSnoozed,
    Sent: setSnoozed,
    Drafts: setDrafts,
    Spam: setSpam,
    Archived: setArchived,
    Trash: setTrash
  };
  const categoryMap2 = {
    Inbox: inbox,
    Starred: starred,
    Snoozed: snoozed,
    Sent: sent,
    Drafts: drafts,
    Spam: spam,
    Archived: archived,
    Trash: trash
  };
  

  const moveToTrash = () => {

    
    if(selectedIds === null)
    {
        return;
    }
    setTrash((prev) => {
        return(
        [...prev, ...selectedIds])
    })
    const newFilteredArray = inbox.filter((item )=> {
        if(selectedIds.includes(item))
        {
            return false;
        }
        return true;
    })
    setInbox(newFilteredArray);
  };


  const moveToSpam = (filteredArray) => {

    if(selectedIds === null)
    {
        return;
    }
    setSpam((prev) => {
        return(
        [...prev, ...selectedIds])
    })
    const newFilteredArray = inbox.filter((item )=> {
        if(selectedIds.includes(item))
        {
            return false;
        }
        return true;
    })
    setInbox(newFilteredArray);
  };


  const moveToSnooze = () => {

    if(selectedIds === null)
    {
        return;
    }
    setSnoozed((prev) => {
        if(!prev)
        {
            return;
        }
        return(
        [...prev, ...selectedIds])
    })
    const newFilteredArray = inbox.filter((item )=> {
        if(selectedIds.includes(item))
        {
            return false;
        }
        return true;
    })
    setInbox(newFilteredArray);
  };

  const moveToArchive = () => {

    if(selectedIds === null)
    {
        return;
    }
    setArchived((prev) => {
        return(
        [...prev, ...selectedIds])
    })

    const newFilteredArray = inbox.filter((item )=> {
        if(selectedIds.includes(item))
        {
            return false;
        }
        return true;
    })
    setInbox(newFilteredArray);
  };

  useEffect(() => {
    const fetchEmails = async () => {
        try {
            const response = await axios.get('/api/received-emails');
            setInbox(response.data.slice((currentPage - 1) * 10, currentPage * 10));
            setFilteredInbox(response.data.slice((currentPage - 1) * 10, currentPage * 10))
            setTotalPages(response.data.length/10)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching emails:', error);
            setError('Error fetching emails');
            setLoading(false);
        }
    };
    fetchEmails();
  }, [currentPage]);


  useEffect(() => {
    const fetchEmails = async () => {
        try {
            const response = await axios.get('/api/sent-emails');
            setSent(response.data.reverse().slice((currentPage - 1) * 10, currentPage * 10));
            setFilteredSent(response.data.reverse().slice((currentPage - 1) * 10, currentPage * 10))
            setTotalPages(response.data.length/10)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching sent emails:', error);
            setLoading(false);
        }
    };

    fetchEmails();
  }, [currentPage]);

  

  useEffect(() => {
    setCurrentPage(1)
    setSelectedIds([])
  }, [type])
  

  
  return (
    <div className='w-full ml-2 mb-2 border-2 shadow-lg rounded-xl bg-white h-full mr-4'>
        {type === "Sent" ?
        <FilterSent setEmails = {setSent} filteredEmails={filteredSent} setFilteredEmails={setFilteredSent} emails = {sent} /> 
        : type === "Inbox" ?
        <FilterInbox setEmails = {setInbox} filteredEmails={filteredInbox} setFilteredEmails={setFilteredInbox} emails = {inbox} />
        : null}
        <div className='flex p-4 z-0 justify center  rounded-t-xl '>
            <div className='font-bold  space-x-4 pl-2  items-center'>
                
                {/* <button onClick={handleRefresh} className={`${refresh ? "p-2 bg-slate-300 hidden rounded-full" : "hidden"}`}>
                    <Tooltip title = 'Refresh'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                    </Tooltip>
                </button> */}
            </div>
            {selectedIds.length > 0 ? (
            <div className='flex items-center space-x-3'>
                <button onClick={moveToSpam}>
                    <Tooltip title = 'Report Spam'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><path d="M12 16h.01"/><path d="M12 8v4"/><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/></svg>
                    </Tooltip>
                </button>
                <button onClick={moveToArchive}>
                    <Tooltip title = 'Archive'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-archive"><circle cx="15" cy="19" r="2"/><path d="M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1"/><path d="M15 11v-1"/><path d="M15 17v-2"/></svg>
                    </Tooltip>
                </button>
                <button onClick={moveToTrash}>
                    <Tooltip title = 'Delete'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>  
                    </Tooltip>
                </button>
                <button onClick={moveToSnooze}>
                    <Tooltip title = 'Snooze'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-4 "><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </Tooltip>
                </button>
            </div>) 
            : null}
            
        </div>
        <div className=' border-2 space-y-4 p-2 h-[80%] justify-between items-center '>
            {emailCategories.map((categoryData, index) => {
                return(
                <MailByCategory
                    type = {type}
                    key={index}
                    category={categoryData.category}
                    emails={
                        categoryData.category === 'Inbox' ? filteredInbox:
                        categoryData.category === 'Starred' ? starred.slice((currentPage - 1) * 10, currentPage * 10) :
                        categoryData.category === 'Snoozed' ? snoozed.slice((currentPage - 1) * 10, currentPage * 10) :
                        categoryData.category === 'Sent' ? filteredSent :
                        categoryData.category === 'Drafts' ? drafts.slice((currentPage - 1) * 10, currentPage * 10) :
                        categoryData.category === 'Spam' ? spam.slice((currentPage - 1) * 10, currentPage * 10) :
                        categoryData.category === 'Archived' ? archived.slice((currentPage - 1) * 10, currentPage * 10) :
                        trash
                    }
                    selectAll = {selectAll}
                    setIsSelected={setIsSelected}
                    setSelectedIds = {setSelectedIds}
                    selectedIds = {selectedIds}
                    setStarred={setStarred}
                    inbox={inbox}
                    starred={starred}
            />)})}
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
        
        {/* <Footer/> */}
    </div>
  )
}

export default Mails
