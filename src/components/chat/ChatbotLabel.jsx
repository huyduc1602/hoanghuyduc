import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
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
`;

const ChatbotLabel = () => {
    return (
        <CircleText>
            <svg viewBox="0 0 100 100">
                <defs>
                    <path
                        id="circle"
                        d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                </defs>
                <text fontSize="13.5" fill="currentColor">
                    <textPath xlinkHref="#circle" startOffset="0%">
                        Chat with AI • Chat with AI •
                    </textPath>
                </text>
            </svg>
        </CircleText>
    );
};

export default ChatbotLabel;