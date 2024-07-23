'use client'
import React, { useContext } from 'react'
import { Tooltip } from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import  AppContext from '../context'


const Header = () => {

  const [isActive, setIsActive] = useState(false)
  const {setMenu, type} = useContext(AppContext);
  const [tab, setTab] = useState("Login")
  
//   const [status, setStatus] = useState(second)

  const handleMenu = () =>
  {
    setMenu((prev) => !prev)
  }

  const handleSearch = () =>
  {
    setIsActive((prev) => !prev)
  }

  return (
    <div className='h-16 p-2 pl-8 pr-8 shadow-lg flex justify-between' >
        
        <div className='space-x-8 ml-2 flex'>
            {tab === "Emails" ?
            <button onClick={handleMenu}>
                <Tooltip title = "Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                </Tooltip>
            </button> : null}
            {!isActive ?
            <Link href = '/' className=' hover space-x-1 items-center flex'>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-13.2 -16.50405 114.4 99.0243"><path fill="#4285f4" d="M6 66.0162h14v-34l-20-15v43c0 3.315 2.685 6 6 6z"/><path fill="#34a853" d="M68 66.0162h14c3.315 0 6-2.685 6-6v-43l-20 15z"/><path fill="#fbbc04" d="M68 6.0162v26l20-15v-8c0-7.415-8.465-11.65-14.4-7.2z"/><path fill="#ea4335" d="M20 32.0162v-26l24 18 24-18v26l-24 18z"/><path fill="#c5221f" d="M0 9.0162v8l20 15v-26l-5.6-4.2c-5.935-4.45-14.4-.215-14.4 7.2z"/></svg>
                <span className='font-semibold text-xl text-gray-500'>Gmail</span>
            </Link>
            : null}
            
        </div>
        
        {/* <div className='items-center md:inline hidden p-2 bg-[#eaf1fb] rounded-full relative'>
            <button className='absolute top-4'>
                <Tooltip title = 'Search'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </Tooltip>
            </button>
            <input className='ml-8 p-1  focus:outline-none bg-[#eaf1fb] ' type='text' placeholder='Search mail' />
            
        </div> */}
        {/* <div>
            {isActive ?
            <input className='ml-8 p-2  focus:outline-none bg-[#eaf1fb] ' type='text' placeholder='Search mail' />
            : null}
            <button onClick={handleSearch} className=' md:hidden bg-slate-200 rounded-full p-4 inline'>
                <Tooltip title = 'Search'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </Tooltip>
            </button>
        </div> */}
        
        <div className='space-x-6 flex items-center'>
            <Link className={`${tab === "Login" ? "text-blue-600 font-semibold" : null}`} onClick={() => setTab("Login")} href = '/'>
                Login
            </Link>
            <Link className={`${tab === "Emails" ? "text-blue-600 font-semibold" : null}`} onClick={() => setTab("Emails")} href = '/CheckEmails'>
                Emails
            </Link>
        </div>
        
    </div>
  )
}

export default Header
