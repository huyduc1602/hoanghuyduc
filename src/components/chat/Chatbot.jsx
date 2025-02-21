import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Fab,
    Zoom,
    IconButton,
    Badge,
    CircularProgress,
    Chip,
    Stack,
    Tooltip,
    Collapse
} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { websiteQA } from '../../data/chatbotQA';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatSuggestions from './ChatSuggestions';
import ChatbotLabel from './ChatbotLabel';

const Chatbot = ({ isStandalone = false, fullScreen = false, hideFloating = false }) => {
    // Update messages state to use localStorage
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    // Save messages to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [popupWindow, setPopupWindow] = useState(null); // Add state for popup window
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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
    }, [messages, isOpen]);

    // Add this function to handle suggestion clicks
    const handleSuggestionClick = (question) => {
        setInput(question);
        sendMessage(question);
    };

    const sendMessage = async (messageText = input) => {
        if (!messageText.trim()) return;

        const userMessage = messageText.trim();
        const newMessages = [...messages, { role: "user", content: userMessage }];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        // Check for predefined answers first
        const predefinedAnswer = Object.values(websiteQA)
            .flat()
            .find(qa => qa.q.toLowerCase() === userMessage.toLowerCase())?.a;

        if (predefinedAnswer) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: predefinedAnswer
            }]);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios({
                method: 'post',
                url: 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    inputs: `<s>[INST] ${userMessage} [/INST]`,
                    parameters: {
                        max_new_tokens: 1024,
                        temperature: 0.7,
                        top_p: 0.9,
                        do_sample: true,
                        return_full_text: false
                    }
                }
            });

            if (response.data && Array.isArray(response.data)) {
                const botResponse = response.data[0]?.generated_text
                    ?.replace(/^<s>\[INST\].*\[\/INST\]\s*/g, '') // Remove instruction prefix
                    ?.trim();

                if (botResponse) {
                    setMessages(prev => [...prev, {
                        role: "assistant",
                        content: botResponse
                    }]);
                } else {
                    throw new Error('No response generated');
                }
            } else if (response.data?.error?.includes('loading')) {
                // Handle model loading state
                const loadingMessage = detectLanguageAndGetErrorMessage(userMessage, 'loading');
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: loadingMessage
                }]);

                // Retry after a delay
                setTimeout(sendMessage, 20000);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error);
            const errorMessage = detectLanguageAndGetErrorMessage(userMessage, 'error');
            setMessages(prev => [...prev, {
                role: "assistant",
                content: errorMessage
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to detect language and return appropriate error message
    const detectLanguageAndGetErrorMessage = (text, type = 'error') => {
        const messages = {
            loading: {
                zh: "模型正在加载中，请稍候（约20秒）...",
                ja: "モデルを読み込んでいます。少々お待ちください（約20秒）...",
                th: "กำลังโหลดโมเดล กรุณารอสักครู่ (ประมาณ 20 วินาที)...",
                vi: "Đang tải mô hình, vui lòng đợi (khoảng 20 giây)...",
                en: "Loading the model, please wait (about 20 seconds)..."
            },
            error: {
                zh: "抱歉，系统暂时出现问题。请稍后再试。",
                ja: "申し訳ありません。システムに問題が発生しました。",
                th: "ขออภัย ระบบมีปัญหา โปรดลองอีกครั้งในภายหลัง",
                vi: "Xin lỗi, hệ thống đang gặp sự cố. Vui lòng thử lại sau.",
                en: "Sorry, the system is experiencing issues. Please try again later."
            }
        };

        // Detect language
        const lang = /[\u4e00-\u9fff]/.test(text) ? 'zh'
            : /[\u3040-\u30ff]/.test(text) ? 'ja'
                : /[\u0E00-\u0E7F]/.test(text) ? 'th'
                    : /[ạàáảãâậầấẩẫăặằắẳẵèéẻẽêệềếểễìíỉĩòóỏõôộồốổỗơớờởỡùúủũưựừứửữỳýỷỹđ]/.test(text) ? 'vi'
                        : 'en';

        return messages[type][lang];
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setSelectedCategory(null);
        setInput("");
    };

    // Add function to handle opening in new window
    const handleOpenInNewWindow = () => {
        const width = 400;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
            '/chat',
            'ChatWindow',
            `width=${width},height=${height},left=${left},top=${top}`
        );
        setPopupWindow(popup);
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
                    bgcolor: '#f5f5f5'
                }}>
                    {messages.length === 0 && (
                        <ChatSuggestions
                            suggestions={websiteQA}
                            selectedCategory={selectedCategory}
                            onCategorySelect={setSelectedCategory}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    )}
                    <MessageList
                        messages={messages}
                        isLoading={isLoading}
                        messagesEndRef={messagesEndRef}
                    />
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
                            width: '100vw',
                            height: '100vh',
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
                        {messages.length === 0 && (
                            <ChatSuggestions
                                suggestions={websiteQA}
                                selectedCategory={selectedCategory}
                                onCategorySelect={setSelectedCategory}
                                onSuggestionClick={handleSuggestionClick}
                            />
                        )}
                        <MessageList
                            messages={messages}
                            isLoading={isLoading}
                            messagesEndRef={messagesEndRef}
                        />
                    </Box>
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