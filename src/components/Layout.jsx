import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Footer, Chatbot } from './';

const Layout = ({ children }) => {
    const location = useLocation();
    const isChatPage = location.pathname === '/chat';

    return (
        <>
            <Navbar />
            <main className='bg-slate-300/20'>
                {children}
            </main>
            <Footer />
            {!isChatPage && <Chatbot />} {/* Only show floating chatbot if not on chat page */}
        </>
    );
};

export default Layout;