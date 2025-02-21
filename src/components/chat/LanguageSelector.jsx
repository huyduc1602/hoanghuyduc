import { Menu, MenuItem, IconButton, Typography, Tooltip } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import { languageSelectorTranslations } from '../../constants/translations';

const LanguageSelector = () => {
    const { currentLanguage, changeLanguage, languages } = useLanguage();
    const [anchorEl, setAnchorEl] = useState(null);
    const translations = languageSelectorTranslations[currentLanguage] || languageSelectorTranslations.en;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageSelect = (langCode) => {
        changeLanguage(langCode);
        handleClose();
    };

    return (
        <>
            <Tooltip title={`${translations.current}: ${languages[currentLanguage].name}`}>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        color: 'white',
                        fontSize: '1.25rem',
                        padding: '4px',
                        minWidth: '32px'
                    }}
                    aria-label={translations.selectLanguage}
                >
                    {languages[currentLanguage].flag}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {Object.entries(languages).map(([code, lang]) => (
                    <MenuItem
                        key={code}
                        onClick={() => handleLanguageSelect(code)}
                        selected={currentLanguage === code}
                    >
                        <Typography sx={{ mr: 1 }}>{lang.flag}</Typography>
                        {lang.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LanguageSelector;