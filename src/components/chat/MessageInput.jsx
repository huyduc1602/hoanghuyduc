import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({ 
  input, 
  onChange, 
  onSend, 
  onKeyPress, 
  isLoading, 
  fullWidth = false 
}) => (
  <Box sx={{ p: 2, bgcolor: 'white', borderTop: 1, borderColor: 'divider' }}>
    <Box sx={{ 
      display: "flex", 
      gap: 1,
      maxWidth: fullWidth ? '800px' : '100%',
      margin: '0 auto'
    }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={input}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={isLoading}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3
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

export default MessageInput;