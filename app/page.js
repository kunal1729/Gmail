'use client'
import { useEffect } from 'react';
import axios from 'axios';
import  AppContext  from './context';
import { useContext } from 'react';

export default function Home() {

    const {smtpPass, smtpPort, smtpUser, host, setHost, setSmtpPass, setSmtpPort, setSmtpUser, smtpStatus, setIsAuthenticated, setSmtpStatus, isAuthenticated} = useContext(AppContext);
   
    // const [recipient, setRecipient] = useState('');
    // const [senderName, setSenderName] = useState('');
    // const [subject, setSubject] = useState('');
    // const [body, setBody] = useState('');
    // const [status, setStatus] = useState('');
    console.log(smtpPass)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedSmtpUser = localStorage.getItem('smtpUser');
            const savedSmtpPass = localStorage.getItem('smtpPass');
            const savedHost = localStorage.getItem('host');
            const savedSmtpPort = localStorage.getItem('smtpPort');

            if (savedSmtpUser && savedSmtpPass && savedHost && savedSmtpPort) {
                setSmtpUser(savedSmtpUser);
                setSmtpPass(savedSmtpPass);
                setHost(savedHost);
                setSmtpPort(savedSmtpPort);
                setIsAuthenticated(true);
            }
        }
    }, []);

    const handleSaveDetails = async (e) => {
        e.preventDefault();
        console.log(typeof window)
        setSmtpStatus('Saving...');

        try {
            const response = await axios.post('/api/save-creds', {
                smtpUser : smtpUser,
                smtpPass : smtpPass,
                host : host,
                smtpPort : smtpPort,
                ImapPort: '993'
            });

            console.log(response)

            if (typeof window !== 'undefined') {
                localStorage.setItem('smtpUser', smtpUser);
                localStorage.setItem('smtpPass', smtpPass);
                localStorage.setItem('host', host);
                localStorage.setItem('smtpPort', smtpPort);
                localStorage.setItem('ImapPort', '993');
            }
            setSmtpStatus('SMTP Credentials saved successfully');
            setIsAuthenticated(true);
        } catch (error) {
            setSmtpStatus(`Error saving SMTP Credentials: ${error.response ? error.response.data.message : error.message}`);
        }
        console.log(smtpPass)
    };


    const handleReset = () => {
        setSmtpUser('');
        setSmtpPass('');
        setHost('');
        setSmtpPort('');
        setSmtpStatus('');
        setIsAuthenticated(false);

        if (typeof window !== 'undefined') {
            localStorage.removeItem('smtpUser');
            localStorage.removeItem('smtpPass');
            localStorage.removeItem('host');
            localStorage.removeItem('smtpPort');
        }
    };

  return (
    <main className="min-h-screen flex flex-col bg-gray-100 p-4">
       
        <div className="max-w-screen-lg mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Login</h1>
        </div>
        <form onSubmit={handleSaveDetails}>
            <div className="mb-4">
                <label className="block text-sm font-medium ">SMTP User:</label>
                <input
                    type="text"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                    required
                    disabled={isAuthenticated}
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium ">SMTP Password:</label>
                <input
                    type="password"
                    value={smtpPass}
                    onChange={(e) => setSmtpPass(e.target.value)}
                    required
                    disabled={isAuthenticated}
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium ">SMTP Host:</label>
                <input
                    type="text"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    required
                    disabled={isAuthenticated}
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium ">SMTP Port:</label>
                <input
                    type="text"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    required
                    disabled={isAuthenticated}
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
            </div>
            <button
                type="submit"
                className={` text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isAuthenticated ? 'bg-green-600' : 'bg-gray-500'} hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                disabled={isAuthenticated}
            >
                {isAuthenticated ? 'Authenticated' : 'Login'}
            </button>
            <div className="col-span-1 md:col-span-2 mt-6 flex justify-center">
                <button
                    onClick={handleReset}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-lg"
                >
                    Reset
                </button>
            </div>
        </form>
        {smtpStatus && (
            <p className={`mt-4 text-sm ${smtpStatus.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{smtpStatus}</p>
        )}

       
    </main>
  );
}
