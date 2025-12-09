import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLanguage, languages } from '../context/LanguageContext';
import { websiteQA } from '../data/chatbotQA';
import { websiteQATranslations } from '../data/websiteQATranslations';

// Chat messages for different languages
const ERROR_MESSAGES = {
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

// API Configuration
const API_CONFIG = {
    url: 'https://router.huggingface.co/v1/chat/completions',
    model: 'meta-llama/Llama-3.1-8B-Instruct',
    maxTokens: 1024,
    temperature: 0.7,
    topP: 0.9
};

/**
 * Detect language from text and return appropriate message
 */
export const detectLanguageAndGetErrorMessage = (text, type = 'error') => {
    const lang = /[\u4e00-\u9fff]/.test(text) ? 'zh'
        : /[\u3040-\u30ff]/.test(text) ? 'ja'
            : /[\u0E00-\u0E7F]/.test(text) ? 'th'
                : /[ạàáảãâậầấẩẫăặằắẳẵèéẻẽêệềếểễìíỉĩòóỏõôộồốổỗơớờởỡùúủũưựừứửữỳýỷỹđ]/.test(text) ? 'vi'
                    : 'en';

    return ERROR_MESSAGES[type][lang];
};

/**
 * Send message to Hugging Face API
 */
export const sendMessageToAPI = async (messages, languageInstruction) => {
    const response = await axios({
        method: 'post',
        url: API_CONFIG.url,
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        data: {
            model: API_CONFIG.model,
            messages: [
                {
                    role: 'system',
                    content: languageInstruction || 'You are a helpful assistant.'
                },
                ...messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            ],
            max_tokens: API_CONFIG.maxTokens,
            temperature: API_CONFIG.temperature,
            top_p: API_CONFIG.topP,
            stream: false
        }
    });

    return response;
};

/**
 * Find predefined answer from QA data
 */
export const findPredefinedAnswer = (userMessage) => {
    return Object.values(websiteQA)
        .flat()
        .find(qa => qa.q.toLowerCase() === userMessage.toLowerCase())?.a;
};

/**
 * Custom hook for chatbot functionality
 */
const useChatbot = () => {
    const { currentLanguage } = useLanguage();
    const messagesEndRef = useRef(null);

    // State
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Get QA content for current language
    const qaContent = websiteQATranslations[currentLanguage] || websiteQATranslations.en;

    // Save messages to localStorage
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Handle suggestion click
    const handleSuggestionClick = (question) => {
        const category = Object.keys(qaContent).find(cat =>
            qaContent[cat].some(item => item.q === question)
        );

        const answer = qaContent[category]?.find(item => item.q === question)?.a;

        if (answer) {
            setMessages(prev => [...prev,
                { role: 'user', content: question },
                { role: 'assistant', content: answer }
            ]);
        }
    };

    // Send message
    const sendMessage = async (messageText = input) => {
        if (!messageText.trim()) return;

        const userMessage = messageText.trim();
        const newMessages = [...messages, { role: "user", content: userMessage }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        // Language instruction
        const languageInstruction = currentLanguage !== 'en'
            ? `Please respond in ${languages[currentLanguage].name}. `
            : '';

        // Check for predefined answers first
        const predefinedAnswer = findPredefinedAnswer(userMessage);

        if (predefinedAnswer) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: predefinedAnswer
            }]);
            setIsLoading(false);
            return;
        }

        try {
            const response = await sendMessageToAPI(newMessages, languageInstruction);

            if (response.data?.choices?.[0]?.message?.content) {
                const botResponse = response.data.choices[0].message.content.trim();
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: botResponse
                }]);
            } else if (response.data?.error?.includes('loading')) {
                const loadingMessage = detectLanguageAndGetErrorMessage(userMessage, 'loading');
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: loadingMessage
                }]);
                setTimeout(() => sendMessage(messageText), 20000);
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

    // Handle key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Handle new chat
    const handleNewChat = () => {
        setMessages([]);
        setSelectedCategory(null);
        setInput('');
    };

    return {
        // State
        messages,
        input,
        isLoading,
        selectedCategory,
        qaContent,
        messagesEndRef,
        
        // Setters
        setInput,
        setSelectedCategory,
        
        // Actions
        sendMessage,
        handleSuggestionClick,
        handleKeyPress,
        handleNewChat,
        scrollToBottom
    };
};

export default useChatbot;
