'use client'
import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Mails from '../components/Mails'
import { useState } from 'react'
import NewMail from '../components/NewMail'
import AppContext  from '../context.js'

const Emails = () => {

  const [compose, setCompose] = useState(false)
  
  const {menu, type, setType} = useContext(AppContext)
  const {smtpPass, smtpPort, smtpUser, host} = useContext(AppContext);
    
  return (
    <div className='flex p-2 relative min-h-screen h-full pb-2 '>
        {menu ? (
            <Sidebar type = {type} setType = {setType} setCompose={setCompose} compose = {compose}/>
          )
         : null}

        <Mails type={type} />
        <NewMail smtpPass = {smtpPass} host = {host} smtpPort={smtpPort} smtpUser={smtpUser}  setCompose = {setCompose} compose = {compose} />
    </div>
  )
}

export default Emails;
