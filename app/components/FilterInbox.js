'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Fuse from 'fuse.js'
import { useLayoutEffect } from 'react'

const FilterInbox = ({emails, filteredEmails, setFilteredEmails}) => {
    const [filters, setFilters] = useState({});
    const [openFilter, setOpenFilter] = useState(false)
    const [filterButton, setFilterButton] = useState(false)
    const fuse = new Fuse(emails, {
      keys: [
        'from', 'body', 'subject' , 'date'
      ], includeScore : true}
    )
    const [input, setInput] = useState("")
    const handleChange = (e) =>
    {
      const property = e.target.id;
      setFilters((prev) => ({...prev, [property] : e.target.value}))
    }
  
    const handleFilter = (e) =>
    {
      e.preventDefault();
      setFilterButton((prev) => !prev)
    }
    
    useLayoutEffect(() => {
      const filteredResults = emails.filter((email) =>
      {
        function extractTextBeforeBrackets(input) {
          const match = input.match(/^(.*?)\s*\[REF-\d+\]/);
          return match ? match[1] : null;
        }
        console.log(new Date(email.date).toLocaleString())
        const input = email.subject;
        const textBeforeBrackets = extractTextBeforeBrackets(input);
        if((filters.senderName === undefined || filters.senderName === email.senderName) &&
          (filters.date === undefined || new Date(email.date).toLocaleString().includes(filters.date)) &&
          (filters.subject === undefined || filters.subject === textBeforeBrackets) &&
          (filters.body === undefined || email.body.includes(filters.body)))
        {
          return true;
        }
        else
        {
          return false;
        }
      })
      console.log(filteredResults)
      setFilteredEmails(filteredResults)
      console.log(filteredEmails)
    }, [filterButton])
    
  
    if(input === "" && openFilter === false)
    {
      setFilteredEmails(emails)
    }
  
    const handleInput = (e) =>
    {
      setInput(e.target.value);
      
    }
    
    useEffect(() => {
      const searchResults = fuse.search(input)
      const filteredResults = searchResults.map((result) => result.item)
      setFilteredEmails(filteredResults)
      console.log(filteredResults)
    }, [input])
    
  
  
    return (
      <div className='relative rounded-full p-2 text-md  z-0 mx-auto text-black'>
          <div className='relative mx-auto  w-fit '>
              <input disabled = {openFilter}  value={input} onChange={handleInput} className='p-2 bg-[#c2e7ff] focus:outline-none rounded-lg' placeholder='Search mail' />
              <button onClick={() => setOpenFilter((prev) => !prev)} className='text-black absolute right-1 top-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
              </button>
          </div>
          {openFilter ?
          <form type = "submit" onChange={handleChange} className='bg-[#c2e7ff] w-[70%] mx-auto text-black z-10 text-center p-4  space-y-2 '>
            <div className='flex space-x-4 justify-between'>
                <label className=''>From :</label>
                <input id='from' className=' p-1 w-[80%] focus:outline-none' />
            </div>
            <div className='flex space-x-4 justify-between'>
                <label className=''>Date :</label>
                <input id='date' className=' p-1 w-[80%] focus:outline-none' />
            </div>
            <div className='flex space-x-4 justify-between'>
                <label className=''>Subject :</label>
                <input id='subject' className=' p-1 w-[80%] focus:outline-none' />
            </div>
            <div className='flex space-x-4 justify-between'>
                <label className=''>Included words :</label>
                <input id='body' className=' p-1 w-[80%] focus:outline-none' />
            </div>
            <button onClick={handleFilter} className='text-black w-28 p-2 rounded-lg text-center bg-blue-500'>
              Filter
            </button>
          </form> : null}
      </div>
    )
}

export default FilterInbox
