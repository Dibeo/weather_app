import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box } from '@mui/material';
import { Language } from '@mui/icons-material';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: 'fr', label: 'Français', flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg' },
    { code: 'en', label: 'English', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg' },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    const currentPath = location.pathname.split('/').slice(2).join('/');
    navigate(`/${languageCode}/${currentPath}`);
    handleMenuClose();
  };

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {t("title")}
          </Typography>
          <Button color="inherit" href="#current">{t("current")}</Button>
          <Button color="inherit" href="#forecast">{t("forecast")}</Button>
          <Button color="inherit" href="#location">{t("location")}</Button>

          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            aria-controls="language-menu"
            aria-haspopup="true"
          >
            <Language />
          </IconButton>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {languages.sort((a, b) => a.label.localeCompare(b.label)).map((language) => (
              <MenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <img
                    src={language.flag}
                    alt={`${language.label} flag`}
                    style={{ width: '20px', height: '15px' }}
                  />
                  {language.label}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
