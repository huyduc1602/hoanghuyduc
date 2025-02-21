import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useLanguage } from '../../context/LanguageContext';
import { inputTranslations } from '../../constants/translations';

const MessageInput = ({
    input,
    onChange,
    onSend,
    onKeyPress,
    isLoading,
    fullWidth = false,
    isDarkMode
}) => {
    const { currentLanguage } = useLanguage();
    const translations = inputTranslations[currentLanguage] || inputTranslations.en;

    return (
        <Box sx={{
            p: 2,
            bgcolor: isDarkMode ? 'background.paper' : 'white',
            borderTop: 1,
            borderColor: 'divider',
            width: '100%'
        }}>
            <Box sx={{
                display: "flex",
                gap: 1,
                width: '100%',
                maxWidth: fullWidth ? '1200px' : '800px',
                margin: '0 auto'
            }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={translations.placeholder}
                    value={input}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    disabled={isLoading}
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            bgcolor: isDarkMode ? 'background.default' : 'background.paper',
                            '& fieldset': {
                                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'
                            }
                        },
                        '& .MuiInputBase-input': {
                            color: isDarkMode ? 'text.primary' : 'inherit'
                        }
                    }}
                />
                <IconButton
                    color="primary"
                    onClick={onSend}
                    disabled={isLoading || !input.trim()}
                    sx={{ borderRadius: '50%' }}
                >
                    {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                </IconButton>
            </Box>
        </Box>
    );
};

export default MessageInput;