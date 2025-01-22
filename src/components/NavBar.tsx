import React from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Dropdown,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language"; // Import de l'icône
import "../styles/Components/NavBar.css";
import languages from "../lang/lang";

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    const currentPath = location.pathname.split("/").slice(2).join("/");
    navigate(`/${languageCode}/${currentPath}`);
  };

  return (
    <BootstrapNavbar expand="lg" className="glassmorphic-navbar" sticky="top">
      <Container>
        <BootstrapNavbar.Brand href="#home">{t("title")}</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#current">{t("current")}</Nav.Link>
            <Nav.Link href="#forecast">{t("forecast")}</Nav.Link>
            <Nav.Link href="#location">{t("location")}</Nav.Link>
          </Nav>
          <Dropdown>
            <Dropdown.Toggle
              variant="transparent"
              id="dropdown-custom-components"
              style={{color:'white'}}
            >
              <LanguageIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark">
              {languages.map((language) => (
                <Dropdown.Item
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  as="button"
                  className="text-white"
                >
                  <img
                    src={language.flag}
                    alt={`${language.label} flag`}
                    style={{
                      width: "20px",
                      height: "15px",
                      marginRight: "10px",
                    }}
                  />
                  {language.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
