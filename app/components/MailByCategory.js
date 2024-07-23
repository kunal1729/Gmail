'use client'
import React from 'react'
import { useState } from 'react';

const MailByCategory = ({ type, category, emails, setIsSelected, inbox, selectAll, setSelectedIds, selectedIds, starred , setStarred }) => {
    const date = new Date().getDate();
    const month = new Date().getMonth()
    
    
    if(emails.length == 0 && type === category)
    {
        return (
            <p>No emails in {category.toLowerCase()}</p>
        )
    }
    
    return(
        <div>
            {emails.length > 0 && type === category  ? (

                emails.map((email, index) => {

                const handleChecked = (e) =>
                {
                    console.log(e);
                    setIsSelected(e.target.value)
                    if(e.target.checked )
                    {
                        setSelectedIds((prev) => {
                            if(!prev)
                            {
                                return;
                            }
                            if(prev?.includes(email))
                            {
                                return;
                            }
                            return([...prev, email])
                        });
                    }
                    else if(selectAll)
                    {
                        setSelectedIds((prev) => {
                            return([...prev, ...MailList[inbox]])
                        });
                    }
                    else{
                        setSelectedIds(prev => prev?.filter(item => {
                            return(
                            (item.id !== email.id)
                        )}));
                    }
                    
                }
                const handleStar = (e) =>
                {
                    console.log(e.nativeEvent.target.attributes[5])
                    if(e.nativeEvent.target.attributes[5] && e.nativeEvent.target.attributes[5].value === "none")
                    {
                        setStarred((prev) => {
                            if(!prev)
                            {
                                return;
                            }
                            if(prev?.includes(email))
                            {
                                return;
                            }
                            return([...prev, email])
                        });
                    }
                    else{
                        setStarred(prev => {
                            const arr = prev.filter((item) => {
                                if(item === email)
                                {
                                    return false
                                }
                                return true
                            })
                            return arr
                        })
                    }
                    
                }

                return (
                <div key={index} className={`flex ${selectedIds.includes(email)  ? 'bg-[#c2dbff]' : "bg-white"} font-bold hover:shadow-2xl p-2 border-b-2 items-center justify-between`}>
                    <div className='space-x-4 pl-2  text-sm flex items-center'>
                        {type === "Inbox" ?
                            <input checked={selectedIds.includes(email)  ? true : false} onClick={handleChecked} type='checkbox'/>
                            
                        : null}
                        {type === "Inbox" || "Starred" ?
                        <button  onClick={handleStar}>
                            <svg id={index} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill = {`${starred.includes(email) ? "gold" : "none"}`} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </button> : null}
                        <span >{type !== "Sent" ? email.from.split('<')[0].trim() : email.senderName}</span>
                    </div>
                    
                    <p className='text-sm font-normal flex flex-col text-start' >
                        <span className='font-bold  hidden sm:inline'>{email.subject.slice(0,20)}...</span>
                        <span className='hidden lg:inline'> {email.body.slice(0, 20)}...</span> 
                    </p>
                    {type !== "Sent" ?
                    <span className='text-xs'>
                        {new Date(email.date).toLocaleString()}
                    </span> : null}
                    {type === "Sent" ?
                    <span className='text-sm'>To : {email.recipient}</span> : null}
                </div>
                )})
            ) : null }
        </div>
    )
}

export default MailByCategory
