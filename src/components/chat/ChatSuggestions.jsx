import { Box, Typography, Stack, Chip, Button, Collapse } from '@mui/material';

const ChatSuggestions = ({ suggestions, selectedCategory, onCategorySelect, onSuggestionClick }) => {
    return (
        <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                {Object.keys(suggestions).map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        onClick={() => onCategorySelect(category)}
                        color={selectedCategory === category ? "primary" : "default"}
                        sx={{ cursor: 'pointer' }}
                    />
                ))}
            </Stack>
            <Stack spacing={1}>
                {selectedCategory && suggestions[selectedCategory]?.map((item, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        onClick={() => onSuggestionClick(item.q)}
                        sx={{
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            whiteSpace: 'normal',
                            height: 'auto',
                            padding: '8px 16px'
                        }}
                    >
                        {item.q}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
};

export default ChatSuggestions;