import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { headerTranslations } from '../../constants/translations';

const ChatHeader = ({
    onClose,
    onNewChat,
    onOpenNewWindow,
    showOpenInNew = true,
    title
}) => {
    const { currentLanguage } = useLanguage();
    const translations = headerTranslations[currentLanguage] || headerTranslations.en;

    return (
        <Box sx={{
            p: 2,
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6">
                    {title || translations.chatbot}
                </Typography>
                <Tooltip title={translations.newChat}>
                    <IconButton
                        onClick={onNewChat}
                        size="small"
                        sx={{
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                        }}
                    >
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                {showOpenInNew && (
                    <Tooltip title={translations.openInNew}>
                        <IconButton
                            onClick={onOpenNewWindow}
                            size="small"
                            sx={{
                                color: 'white',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                            }}
                        >
                            <OpenInNewIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
                <LanguageSelector />
            </Box>
            {onClose && (
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default ChatHeader;