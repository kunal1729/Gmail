'use client'
import React from 'react'
import { useState } from 'react';
import Trash from '../assets/Trash.svg'
import Spam from '../assets/Spam.svg'
import AllMail from '../assets/AllMail.svg'
import Archived from '../assets/Archived.svg'
import Drafts from '../assets/Drafts.svg'
import Inbox from '../assets/Inbox.svg'
import Sent from '../assets/Sent.svg'
import Snoozed from '../assets/Snoozed.svg'
import Starred from '../assets/Starred.svg'

const Sidebar = ({compose, setCompose, type, setType}) => {

  const [more, setMore] = useState("More");
  const handleMore = () =>
  {
    if(more === "More")
    {
      setMore("Less")
    }
    else
    {
      setMore("More")
    }
  }

  const handleCompose = () =>
  {
    setCompose((prev) => !prev)
  }

  return (
    <div className='p-4 w-[20%] space-y-2 text-sm flex flex-col'>
      <button onClick={handleCompose} className='p-4 rounded-2xl font-semibold mx-auto space-x-4 items-center flex bg-[#c2e7ff]'>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
        <span className='text-sm hidden md:inline'>Compose</span>
      </button>
      <div className='space-y-3 ml-2'>
        <button onClick={() => setType("Inbox")} className={`${type === "Inbox" ? "bg-[#d8e4fc] p-2 mx-auto md:content-start w-fit md:w-full rounded-full font-bold flex space-x-4 content-start text-center" : 'flex space-x-4 md:mx-0 mx-auto content-start'} `}>
          <Inbox/>
          <span className='text-sm hidden md:inline '>Inbox</span>
        </button>
        <button onClick={() => setType("Starred")} className={`${type === "Starred" ? "bg-[#d8e4fc] p-2 mx-auto w-fit md:w-full rounded-full font-bold flex space-x-4 content-start text-center" : 'flex space-x-4 md:mx-0 mx-auto content-start'} `}>
          <Starred/>
          <span className='text-sm hidden md:inline'>Starred</span>
        </button>
        <button onClick={() => setType("Snoozed")} className={`${type === "Snoozed" ? "bg-[#d8e4fc] p-2 mx-auto w-fit md:w-full rounded-full font-bold flex space-x-4 content-start text-center" : 'flex space-x-4 md:mx-0 mx-auto content-start'} `}>
          <Snoozed/>
          <span className='text-sm hidden md:inline'>Snoozed</span>
        </button>
        <button onClick={() => setType("Sent")} className={`${type === "Sent" ? "bg-[#d8e4fc] p-2 mx-auto w-fit md:w-full rounded-full font-bold flex space-x-4 content-start text-center" : 'flex space-x-4 mx-auto md:mx-0 content-start'} `}>
          <Sent/>
          <span className='text-sm hidden md:inline'>Sent</span>
        </button>
        <button onClick={handleMore} className='  flex space-x-4 content-start md:mx-0 mx-auto'>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide ${more === "Less" ? "rotate-180" : null} lucide-chevron-down`}><path d="m6 9 6 6 6-6"/></svg>
          <span className='hidden md:inline text-sm'>{more}</span>
        </button>
        {more === "Less" ?
        <div className='flex space-y-3 flex-col'>
          <button onClick={() => setType("Spam")} className={`${type === "Spam" ? "bg-[#d8e4fc] p-2 mx-auto w-fit md:w-full rounded-full font-bold flex space-x-4 content-start text-center" : 'flex space-x-4 mx-auto md:mx-0 content-start'} `}>
            <Spam/>
            <span className='text-sm hidden md:inline'>Spam</span>
          </button>
          <button onClick={() => setType("Archived")} className={`${type === "Archived" ? "bg-[#d8e4fc] p-2 mx-auto w-fit md:w-full rounded-full font-bold flex space-x-4 content-start text-center" : 'flex space-x-4 md:mx-0 mx-auto content-start'} `}>
            <Archived/>
            <span className='text-sm hidden md:inline'>Archived</span>
          </button>
          <button onClick={() => setType("Trash")} className={`${type === "Trash" ? "bg-[#d8e4fc] p-2 mx-auto w-fit md:w-full rounded-full font-bold flex space-x-4 content-start text-center" : 'flex space-x-4 mx-auto md:mx-0 content-start'} `}>
            <Trash/>
            <span className='text-sm hidden md:inline'>Trash</span>
          </button>
        </div>
        : null}
      </div>
      
    </div>
  )
}

export default Sidebar
