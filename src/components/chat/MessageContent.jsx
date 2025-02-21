import { Typography } from '@mui/material';
import MessageLink from './MessageLink';
import { useTheme } from '../../context/ThemeContext';

const MessageContent = ({ content, role }) => {
    const { isDarkMode } = useTheme();

    const renderContent = () => {
        // Split content by markdown links
        const parts = content.split(/(\[.*?\]\([^)]+\))/g);

        return parts.map((part, index) => {
            // Match markdown link pattern
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);

            if (linkMatch) {
                const [, displayText, url] = linkMatch;
                return (
                    <MessageLink
                        key={index}
                        text={displayText} // Use the text between square brackets
                        path={url}
                        role={role}
                    />
                );
            }

            return (
                <Typography
                    key={index}
                    component="span"
                    sx={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                    }}
                >
                    {part}
                </Typography>
            );
        });
    };

    return (
        <Typography component="div" sx={{ lineHeight: 1.5 }}>
            {renderContent()}
        </Typography>
    );
};

export default MessageContent;