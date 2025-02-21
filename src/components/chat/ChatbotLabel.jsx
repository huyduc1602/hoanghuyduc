import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

const rotate = keyframes`
  from {
    transform: rotate(0deg) translateX(70px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(70px) rotate(-360deg);
  }
`;

const StyledLabel = styled('div')`
  position: absolute;
  width: 100px;
  text-align: center;
  animation: ${rotate} 8s linear infinite;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  pointer-events: none;
`;

const ChatbotLabel = () => (
  <StyledLabel>Chat with AI</StyledLabel>
);

export default ChatbotLabel;