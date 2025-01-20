import React, {  } from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Components/NavBar.css';

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: 'fr', label: 'Français', flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg' },
    { code: 'en', label: 'English', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    const currentPath = location.pathname.split('/').slice(2).join('/');
    navigate(`/${languageCode}/${currentPath}`);
  };

  return (
    <BootstrapNavbar expand="lg" className="glassmorphic-navbar" sticky="top">
      <Container>
        <BootstrapNavbar.Brand href="#home">{t('title')}</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#current">{t('current')}</Nav.Link>
            <Nav.Link href="#forecast">{t('forecast')}</Nav.Link>
            <Nav.Link href="#location">{t('location')}</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={t('language')} id="language-dropdown">
              {languages.map((language) => (
                <NavDropdown.Item
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  <img
                    src={language.flag}
                    alt={`${language.label} flag`}
                    style={{ width: '20px', height: '15px', marginRight: '10px' }}
                  />
                  {language.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
