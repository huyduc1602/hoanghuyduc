import { Box, List, ListItem, Paper, ListItemText, Typography } from '@mui/material';

const MessageList = ({ messages, isLoading, messagesEndRef }) => {
  const renderMessageContent = (content) => {
    return content.split('\n').map((line, index) => (
      <Typography
        key={index}
        component="div"
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: 1.5,
          '&:not(:last-child)': { mb: 0.5 }
        }}
      >
        {line}
      </Typography>
    ));
  };

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
            <ListItemText
              primary={renderMessageContent(msg.content)}
              sx={{
                wordBreak: 'break-word',
                '& .MuiListItemText-primary': { fontSize: '0.9rem' }
              }}
            />
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
              Typing...
            </Typography>
          </Paper>
        </ListItem>
      )}
      <div ref={messagesEndRef} />
    </List>
  );
};

export default MessageList;