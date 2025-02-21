import { Box, List, ListItem, Paper, ListItemText, Typography } from '@mui/material';
import MessageContent from './MessageContent';
import { useLanguage } from '../../context/LanguageContext';
import { loadingText } from '../../constants/translations';

const MessageList = ({ messages, isLoading, messagesEndRef }) => {
    const { currentLanguage } = useLanguage();

    return (
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
                        <MessageContent content={msg.content} role={msg.role} />
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
};

export default MessageList;