'use client'
import React from 'react'

const Pagination = ({currentPage, setCurrentPage, totalPages}) => {
    
    const nextPage = () => 
    {
      if(currentPage === totalPages)
      {
        return null;
      }
      else{
        setCurrentPage((prev) => prev + 1);
      }
    }
    const multiPage = () => 
    {
      if(currentPage + 2 === totalPages)
      {
        return null;
      }
      else{
        setCurrentPage((prev) => prev + 2);
      }
    }
    const prevPage = () => 
    {
      if(currentPage === 1)
      {
        return null;
      }
      else{
        setCurrentPage((prev) => prev - 1);
      }
    }
    return (
        <div className=' items-center rounded-md flex flex-col border-2 bg-[#c2e7ff] w-72 mx-auto border-cyan'>
          <ul className=' text-sm  justify-end flex mx-auto space-x-3 items-center'>
            <li className='pt-1' >
                <button onClick={prevPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-arrow-left"><circle cx="12" cy="12" r="10"/><path d="M16 12H8"/><path d="m12 8-4 4 4 4"/></svg>
                </button>
            </li>
            <li className= ' p-1 text-center   text-black '>
                <button className='font-bold'>
                    {currentPage}
                </button>
            </li>
            <li className= ' p-2 hover:*:text-cyan'>
                <button onClick={nextPage}>
                    {currentPage + 1}
                </button>
            </li>
            <li className= ' p-2 hover:*:text-cyan '>
                <button onClick={multiPage}>
                    ...
                </button>
            </li>
            <li className= ' pt-1 hover:*:text-cyan '>
                <button onClick={nextPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-arrow-right"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="m12 16 4-4-4-4"/></svg>
                </button>
            </li>
          </ul>  
        </div>
    )
  }
  
export default Pagination

