import { Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const MessageContent = ({ content, role }) => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    const renderContent = () => {
        // Updated regex to properly capture the path
        const parts = content.split(/(\[.*?\]\(\/.*?\))/g);

        return parts.map((part, index) => {
            // Updated regex to match the exact path
            const linkMatch = part.match(/\[(.*?)\]\((\/[^)]+)\)/);

            if (linkMatch) {
                const [, text, path] = linkMatch;
                return (
                    <Link
                        key={index}
                        onClick={() => {
                            navigate(path); // Remove slice(0, -1) as we now capture the exact path
                        }}
                        sx={{
                            color: role === 'user'
                                ? '#fff'
                                : isDarkMode
                                    ? '#60A5FA'  // Blue-400 for dark mode
                                    : '#2563EB', // Blue-600 for light mode
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontWeight: 500,
                            '&:hover': {
                                opacity: 0.8,
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        {text}
                    </Link>
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