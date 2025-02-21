import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import PropTypes from 'prop-types';

const MessageLink = ({ text, path, role }) => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    const handleClick = (e) => {
        e.preventDefault();
        if (path.startsWith('http')) {
            window.open(path, '_blank', 'noopener,noreferrer');
        } else {
            navigate(path);
        }
    };

    return (
        <Link
            onClick={handleClick}
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
};

MessageLink.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
};

export default MessageLink;