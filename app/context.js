// app/context.js
'use client'
import { createContext } from 'react';
import { useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [smtpUser, setSmtpUser] = useState('');
    const [smtpPass, setSmtpPass] = useState('');
    const [host, setHost] = useState('');
    const [smtpPort, setSmtpPort] = useState('');
    const [smtpStatus, setSmtpStatus] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menu, setMenu] = useState(false)
    const [type, setType] = useState("Inbox");

  return (
    <AppContext.Provider value={{smtpPass, smtpPort, smtpUser, host, smtpStatus, isAuthenticated, setHost, setSmtpPass, setSmtpPort, setSmtpUser, setIsAuthenticated, setSmtpStatus, menu, setMenu, type, setType}}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
