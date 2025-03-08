import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Footer } from '@components';
import Chatbot from '@components/chat/Chatbot';
import DarkModeWithLight from '@components/DarkModeWithLight';

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
            <DarkModeWithLight intensity={0.25} size={300} delay={0.1} />
        </>
    );
};

export default Layout;