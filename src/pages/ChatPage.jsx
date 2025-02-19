import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Chatbot, Meta } from '../components';

const ChatPage = () => {
    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (!savedMessages) {
            localStorage.setItem('chatMessages', JSON.stringify([]));
        }
    }, []);

    return (
        <>
            <Meta
                title="Chat AI"
                description="AI Chat Assistant - Hoang Huy Duc's portfolio website"
                keywords="chat ai, assistant, ai chat, conversation"
            />
            <Box
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#f5f5f5',
                    pt: '64px', // Header height
                    pb: '60px', // Footer height
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        width: '100%',
                        maxWidth: '1200px',
                        minHeight: {
                            xs: 'calc(100vh - 124px)', // Mobile: full height minus header & footer
                            sm: 'calc(100vh - 164px)', // Tablet and up: add some padding
                        },
                        margin: '0 auto',
                        p: { xs: 2, md: 4 },
                        '& > *': {
                            height: '100%',
                            minHeight: 'inherit', // Inherit parent's minHeight
                            display: 'flex',
                            flexDirection: 'column',
                        }
                    }}
                >
                    <Chatbot
                        isStandalone={true}
                        fullScreen={false}
                    />
                </Box>
            </Box>
        </>
    );
};

export default ChatPage;