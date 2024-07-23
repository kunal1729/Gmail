'use client'
import React, { useContext } from 'react'
import { Tooltip } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'

const NewMail = ({compose, setCompose,smtpUser, smtpPass, host, smtpPort}) => {

  const [minimize, setMinimize] = useState(true)
  const [recipient, setRecipient] = useState('');
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('')

  const handleMinimize = () =>
  {
    setMinimize(false)
  }

  const handleFullScreen = () =>
  {
      setMinimize(true)
  }
  const handleClose = () =>
  {
      setCompose((prev) => !prev)
  }

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    console.log(smtpPass)

    try {
        const response = await axios.post('/api/send-email', 
        {    
            recipient : recipient,
            subject : subject,
            body : body,
            senderName : senderName,
            smtpUser : smtpUser,
            smtpPass : smtpPass,
            host : host,
            smtpPort : smtpPort
        });

        console.log(response)
        setStatus(`Email sent successfully: ${response.data.info.messageId}`);
    } catch (error) {
        console.log("hi")
        setStatus(`Error sending email: ${error.response ? error.response.data.message : error.message}`);
    }
    handleClose()
  };




  return (
    <div className={`${compose ? "hidden" : ' absolute rounded-t-3xl shadow-2xl bg-white bottom-0 right-0 w-96 '} `}>
        <div className='flex p-3 bg-[#f8f4fc] rounded-t-xl font-bold justify-between'>
            <label className='text-sm'>New Message</label>
            <div className='flex space-x-2'>
                <Tooltip title = 'Minimize'>
                    <button onClick={handleMinimize}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>
                    </button>
                </Tooltip>
                <Tooltip title = 'Full Screen'>
                    <button onClick={handleFullScreen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
                    </button>
                </Tooltip>
                <Tooltip title = 'Close'>
                    <button onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </Tooltip>
            </div>
        </div>
        <div className={`${minimize ? "inline" : "hidden"}`}>
            <input onChange={(e) => setSenderName(e.target.value)} className='w-full border-b-2 text-sm focus:outline-none p-3 ' placeholder='Sender Name' />
            <input onChange={(e) => setRecipient(e.target.value)} className='w-full border-b-2 text-sm focus:outline-none p-3 ' placeholder='Recipients' />
            <input onChange={(e) => setSubject(e.target.value)}className='w-full border-b-2 text-sm focus:outline-none p-3' placeholder='Subject' />
            <div className=' w-full'>
                <input onChange={(e) => setBody(e.target.value)} className='h-36 w-full p-3 text-sm outline-none'/>
                <div className='p-2 h-[30%]'>
                    <button onClick={handleSend} className='p-2 bg-blue-700 w-24 text-white rounded-full'>
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewMail
