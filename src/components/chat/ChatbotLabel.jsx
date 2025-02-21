import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContext';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const CircleText = styled('div')`
  position: absolute;
  width: 120px;
  height: 120px;
  top: -35px;
  left: -35px;
  animation: ${rotate} 10s linear infinite;
  pointer-events: none;
  transition: all 0.3s ease;

  svg {
    animation: ${pulse} 2s ease-in-out infinite;
  }

  &:hover {
    transform: scale(1.05) rotate(0deg);
    animation-play-state: paused;
  }
`;

const ChatbotLabel = () => {
    const { isDarkMode } = useTheme();

    return (
        <CircleText>
            <svg viewBox="0 0 100 100">
                <defs>
                    <path
                        id="circle"
                        d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={isDarkMode ? "#60A5FA" : "#2563EB"} />
                        <stop offset="100%" stopColor={isDarkMode ? "#3B82F6" : "#1D4ED8"} />
                    </linearGradient>
                </defs>
                <text
                    fontSize="13.5"
                    fill="url(#gradient)"
                    style={{
                        filter: isDarkMode ? 'drop-shadow(0 0 2px rgba(96, 165, 250, 0.3))' : 'none'
                    }}
                >
                    <textPath xlinkHref="#circle" startOffset="0%">
                        Chat with AI • Chat with AI •
                    </textPath>
                </text>
            </svg>
        </CircleText>
    );
};

export default ChatbotLabel;