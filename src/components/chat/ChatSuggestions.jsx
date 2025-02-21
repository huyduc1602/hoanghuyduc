import { Box, Stack, Chip, Button, Collapse, IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ChatSuggestions = ({ suggestions, selectedCategory, onCategorySelect, onSuggestionClick }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const { currentLanguage } = useLanguage();

    const handleCategoryClick = (category) => {
        if (expandedCategory === category) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(category);
            onCategorySelect(category);
        }
    };

    const handleSuggestionClick = (question) => {
        onSuggestionClick(question);
        setExpandedCategory(null);
    };

    return (
        <Box sx={{
            bgcolor: 'background.paper',
            borderTop: 1,
            borderBottom: 1,
            borderColor: 'divider',
            pb: isExpanded ? 2 : 0
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                borderBottom: isExpanded ? 1 : 0,
                borderColor: 'divider',
                bgcolor: 'background.paper'
            }}>
                <IconButton onClick={() => setIsExpanded(!isExpanded)} size="small">
                    {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>

            <Collapse in={isExpanded}>
                <Box sx={{ px: 2, pt: 1 }}>
                    <Stack spacing={1}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                mb: 2,
                                flexWrap: 'wrap',
                                gap: 1
                            }}
                        >
                            {Object.keys(suggestions).map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    onClick={() => handleCategoryClick(category)}
                                    color={expandedCategory === category ? "primary" : "default"}
                                    sx={{ cursor: 'pointer' }}
                                />
                            ))}
                        </Stack>

                        {expandedCategory && (
                            <Stack spacing={1}>
                                {suggestions[expandedCategory]?.map((item, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        onClick={() => handleSuggestionClick(item.q)}
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
                        )}
                    </Stack>
                </Box>
            </Collapse>
        </Box>
    );
};

export default ChatSuggestions;