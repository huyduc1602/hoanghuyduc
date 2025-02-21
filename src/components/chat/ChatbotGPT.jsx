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
    Badge
} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../../context/LanguageContext';
import { loadingText } from '../../constants/translations';

const Chatbot = () => {
    const { currentLanguage } = useLanguage();
    // Initialize hooks
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setHasNewMessage(false);
        } else if (messages.length > 0) {
            setHasNewMessage(true);
        }
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        const newMessages = [...messages, { role: "user", content: userMessage }];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await axios.post('/api/chat', {
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant who can communicate in multiple languages. Always respond in the same language as the user's message."
                    },
                    ...newMessages
                ]
            });

            if (response.data?.choices?.[0]?.message?.content) {
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: response.data.choices[0].message.content
                }]);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error);
            const errorMessage = detectLanguageAndGetErrorMessage(userMessage);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: errorMessage
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to detect language and return appropriate error message
    const detectLanguageAndGetErrorMessage = (text) => {
        if (/[\u4e00-\u9fff]/.test(text)) return "抱歉，系统暂时出现问题。请稍后再试。";
        if (/[\u3040-\u30ff]/.test(text)) return "申し訳ありません。システムに問題が発生しました。";
        if (/[\u0E00-\u0E7F]/.test(text)) return "ขออภัย ระบบมีปัญหา โปรดลองอีกครั้งในภายหลัง";
        if (/[ạàáảãâậầấẩẫăặằắẳẵèéẻẽêệềếểễìíỉĩòóỏõôộồốổỗơớờởỡùúủũưựừứửữỳýỷỹđ]/.test(text))
            return "Xin lỗi, hệ thống đang gặp sự cố. Vui lòng thử lại sau.";
        return "Sorry, the system is experiencing issues. Please try again later.";
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const renderMessages = () => (
        <List>
            {messages.map((msg, index) => (
                <ListItem
                    key={index}
                    sx={{
                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                        mb: 1
                    }}
                >
                    <Paper
                        sx={{
                            p: 1.5,
                            maxWidth: '80%',
                            bgcolor: msg.role === "user" ? "primary.main" : "white",
                            color: msg.role === "user" ? "white" : "text.primary",
                            borderRadius: msg.role === "user"
                                ? '20px 20px 5px 20px'
                                : '20px 20px 20px 5px',
                            boxShadow: 1
                        }}
                    >
                        <ListItemText
                            primary={msg.content}
                            sx={{
                                wordBreak: 'break-word',
                                '& .MuiListItemText-primary': {
                                    fontSize: '0.9rem'
                                }
                            }}
                        />
                    </Paper>
                </ListItem>
            ))}
            {isLoading && (
                <ListItem sx={{ justifyContent: "flex-start" }}>
                    <Paper
                        sx={{
                            p: 1.5,
                            bgcolor: 'grey.100',
                            borderRadius: '20px 20px 20px 5px',
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            {loadingText[currentLanguage] || loadingText.en}
                        </Typography>
                    </Paper>
                </ListItem>
            )}
            <div ref={messagesEndRef} />
        </List>
    );

    return (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
            <Zoom in={!isOpen}>
                <Badge
                    color="error"
                    variant="dot"
                    invisible={!hasNewMessage}
                    sx={{
                        '& .MuiBadge-badge': {
                            right: 14,
                            top: 14
                        }
                    }}
                >
                    <Fab
                        color="primary"
                        onClick={() => {
                            setIsOpen(true);
                            setHasNewMessage(false);
                        }}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            boxShadow: 3
                        }}
                    >
                        <ChatIcon />
                    </Fab>
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
                    {/* Header */}
                    <Box sx={{
                        p: 2,
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant="h6">
                            🤖 AI Chatbot
                        </Typography>
                        <IconButton
                            onClick={() => setIsOpen(false)}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Messages */}
                    <Box sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: 2,
                        bgcolor: '#f5f5f5',
                        scrollBehavior: 'smooth'
                    }}>
                        {renderMessages()}
                    </Box>

                    {/* Input */}
                    <Box sx={{ p: 2, bgcolor: 'white', borderTop: 1, borderColor: 'divider' }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3
                                    }
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                sx={{
                                    borderRadius: 3,
                                    minWidth: 100
                                }}
                            >
                                {isLoading ? 'Sending...' : 'Send'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Zoom>
        </Box>
    );
};

export default Chatbot;