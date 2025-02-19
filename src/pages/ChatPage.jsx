import React from 'react';
import { Box } from '@mui/material';
import { Chatbot, Meta, Navbar, Footer } from '../components';

const ChatPage = () => {
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
                    pt: '64px',
                    pb: '60px',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        width: '100%',
                        maxWidth: '1200px',
                        height: 'calc(100vh - 124px)',
                        margin: '0 auto',
                        p: { xs: 2, md: 4 },
                        '& > *': {
                            height: '100%',
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