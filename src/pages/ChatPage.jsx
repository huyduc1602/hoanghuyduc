import React from 'react';
import { Box } from '@mui/material';
import { Meta } from '../components';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import ChatSuggestions from '../components/chat/ChatSuggestions';
import { useTheme } from '../context/ThemeContext';
import useChatbot from '../hooks/useChatbot';

const ChatPage = () => {
    const { isDarkMode } = useTheme();
    
    const {
        messages,
        input,
        isLoading,
        selectedCategory,
        qaContent,
        setInput,
        setSelectedCategory,
        sendMessage,
        handleSuggestionClick,
        handleKeyPress
    } = useChatbot();

    return (
        <section className='max-container'>
            <Meta
                title="Chat AI"
                description="AI Chat Assistant - Hoang Huy Duc's portfolio website"
                keywords="chat ai, assistant, ai chat, conversation"
            />
            <Box sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: isDarkMode ? '#1a1a1a' : '#ffffff'
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    bgcolor: isDarkMode ? '#2d2d2d' : '#ffffff',
                    borderRadius: 2,
                    boxShadow: isDarkMode ? '0 0 10px rgba(0,0,0,0.5)' : '0 0 10px rgba(0,0,0,0.1)'
                }}>
                    <ChatHeader showOpenInNew={false} isDarkMode={isDarkMode} />
                    <Box sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: 2,
                        bgcolor: isDarkMode ? '#1a1a1a' : '#f5f5f5'
                    }}>
                        <MessageList
                            messages={messages}
                            isLoading={isLoading}
                            isDarkMode={isDarkMode}
                        />
                    </Box>
                    <ChatSuggestions
                        suggestions={qaContent}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                        onSuggestionClick={handleSuggestionClick}
                        isDarkMode={isDarkMode}
                    />
                    <MessageInput
                        input={input}
                        onChange={(e) => setInput(e.target.value)}
                        onSend={() => sendMessage()}
                        onKeyPress={handleKeyPress}
                        isLoading={isLoading}
                        fullWidth={true}
                        isDarkMode={isDarkMode}
                    />
                </Box>
            </Box>
        </section>
    );
};

export default ChatPage;