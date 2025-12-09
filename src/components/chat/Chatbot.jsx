import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Fab,
    Zoom,
    Badge
} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatSuggestions from './ChatSuggestions';
import ChatbotLabel from './ChatbotLabel';
import useChatbot from '../../hooks/useChatbot';

const Chatbot = ({ isStandalone = false, fullScreen = false, hideFloating = false }) => {
    const {
        messages,
        input,
        isLoading,
        selectedCategory,
        qaContent,
        messagesEndRef,
        setInput,
        setSelectedCategory,
        sendMessage,
        handleSuggestionClick,
        handleKeyPress,
        handleNewChat,
        scrollToBottom
    } = useChatbot();

    const [isOpen, setIsOpen] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [popupWindow, setPopupWindow] = useState(null);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setHasNewMessage(false);
            setHasUnreadMessages(false);
        } else if (messages.length > 0) {
            setHasNewMessage(true);
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'assistant') {
                setHasUnreadMessages(true);
            }
        }
    }, [messages, isOpen, scrollToBottom]);

    
    /**
     * Open a new window and redirect to /chat,
     * then set the popup window and close the floating chat window.
     */
    const handleOpenInNewWindow = () => {
        const newTab = window.open('/chat');
        setPopupWindow(newTab);
        setIsOpen(false);
    };

    // Return null if hideFloating is true and not standalone
    if (hideFloating && !isStandalone) {
        return null;
    }

    if (isStandalone) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                ...(fullScreen ? {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1200
                } : {})
            }}>
                <ChatHeader
                    title="🤖 AI Chat Assistant"
                    onNewChat={handleNewChat}
                    showOpenInNew={false}
                />
                <Box sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,
                    bgcolor: '#f5f5f5',
                    position: 'relative' // Add this
                }}>
                    <MessageList
                        messages={messages}
                        isLoading={isLoading}
                        messagesEndRef={messagesEndRef}
                    />
                    {messages.length === 0 && (
                        <ChatSuggestions
                            suggestions={qaContent}
                            selectedCategory={selectedCategory}
                            onCategorySelect={setSelectedCategory}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    )}
                </Box>
                <MessageInput
                    input={input}
                    onChange={(e) => setInput(e.target.value)}
                    onSend={() => sendMessage()}
                    onKeyPress={handleKeyPress}
                    isLoading={isLoading}
                    fullWidth={fullScreen}
                />
            </Box>
        );
    }

    // Return original floating chat UI
    return (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
            <Zoom in={!isOpen}>
                <Badge
                    color="error"
                    variant="dot"
                    invisible={!hasUnreadMessages}
                    sx={{
                        '& .MuiBadge-badge': {
                            right: 14,
                            top: 14
                        }
                    }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <Box sx={{
                            position: 'absolute',
                            width: '130px',
                            height: '130px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ChatbotLabel />
                        </Box>
                        <Fab
                            color="primary"
                            onClick={() => {
                                setIsOpen(true);
                                setHasUnreadMessages(false);
                            }}
                            sx={{
                                width: 56,
                                height: 56,
                                position: 'relative',
                                zIndex: 1,
                                boxShadow: 3
                            }}
                        >
                            <ChatIcon />
                        </Fab>
                    </Box>
                </Badge>
            </Zoom>

            <Zoom in={isOpen}>
                <Paper
                    elevation={6}
                    sx={{
                        width: { xs: '100vw', sm: 350 },
                        height: 500,
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        borderRadius: 2,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        '@media (max-width: 600px)': {
                            width: '90vw',
                            height: '90vh',
                            borderRadius: 0,
                        }
                    }}
                >
                    <ChatHeader
                        onClose={() => setIsOpen(false)}
                        onNewChat={handleNewChat}
                        onOpenNewWindow={handleOpenInNewWindow}
                    />
                    <Box sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: 2,
                        bgcolor: '#f5f5f5',
                        scrollBehavior: 'smooth'
                    }}>
                        <MessageList
                            messages={messages}
                            isLoading={isLoading}
                            messagesEndRef={messagesEndRef}
                        />
                    </Box>
                    {!isLoading && (
                        <ChatSuggestions
                            suggestions={qaContent}
                            selectedCategory={selectedCategory}
                            onCategorySelect={setSelectedCategory}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    )}
                    <MessageInput
                        input={input}
                        onChange={(e) => setInput(e.target.value)}
                        onSend={() => sendMessage()}
                        onKeyPress={handleKeyPress}
                        isLoading={isLoading}
                    />
                </Paper>
            </Zoom>
        </Box>
    );
};

export default Chatbot;