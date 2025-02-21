import { Box, Typography, Stack, Chip, Button, Collapse } from '@mui/material';

const ChatSuggestions = ({ 
  suggestions, 
  selectedCategory, 
  onCategorySelect, 
  onSuggestionClick 
}) => (
  <Box sx={{ p: 2 }}>
    <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
      Suggested Questions
    </Typography>
    <Stack spacing={1}>
      {Object.entries(suggestions).map(([category, items]) => (
        <Box key={category}>
          <Chip
            label={category}
            color={selectedCategory === category ? "primary" : "default"}
            onClick={() => onCategorySelect(category)}
            sx={{ mb: 1 }}
          />
          <Collapse in={selectedCategory === category}>
            <Stack spacing={0.5} sx={{ pl: 2 }}>
              {items.map((item, index) => (
                <Button
                  key={index}
                  variant="text"
                  size="small"
                  onClick={() => onSuggestionClick(item.q)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none'
                  }}
                >
                  {item.q}
                </Button>
              ))}
            </Stack>
          </Collapse>
        </Box>
      ))}
    </Stack>
  </Box>
);

export default ChatSuggestions;