import React, { useEffect, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { Meta } from '../components';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import ChatSuggestions from '../components/chat/ChatSuggestions';
import { useLanguage } from '../context/LanguageContext';
import { websiteQATranslations } from '../data/websiteQATranslations';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { currentLanguage } = useLanguage();
    const qaContent = websiteQATranslations[currentLanguage] || websiteQATranslations.en;

    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const handleSuggestionClick = (question) => {
        const selectedCategory = Object.keys(qaContent).find(category =>
            qaContent[category].some(item => item.q === question)
        );

        const answer = qaContent[selectedCategory].find(item => item.q === question)?.a;

        if (answer) {
            setMessages(prev => [...prev,
            { role: 'user', content: question },
            { role: 'assistant', content: answer }
            ]);
            // Don't reset selectedCategory here
        }
    };

    const handleSendMessage = () => {
        if (!input.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInput('');
        setIsLoading(true);

        // Add your message handling logic here
        // When done, set isLoading to false
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            paddingTop: '100px',
            paddingBottom: '50px',
            paddingLeft: 5,
            paddingRight: 5,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default'
        }}>
            <Meta
                title="Chat AI"
                description="AI Chat Assistant - Hoang Huy Duc's portfolio website"
                keywords="chat ai, assistant, ai chat, conversation"
            />
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}>
                <ChatHeader showOpenInNew={false} />
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <Box sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: 2,
                        bgcolor: '#f5f5f5'
                    }}>
                        <MessageList
                            messages={messages}
                            isLoading={isLoading}
                        />
                    </Box>
                    <ChatSuggestions
                        suggestions={qaContent}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                        onSuggestionClick={handleSuggestionClick}
                    />
                    <MessageInput
                        input={input}
                        onChange={(e) => setInput(e.target.value)}
                        onSend={handleSendMessage}
                        onKeyPress={handleKeyPress}
                        isLoading={isLoading}
                        fullWidth={true} // Always set to true for ChatPage
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ChatPage;