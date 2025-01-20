import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Weather from "./pages/Weather";

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  // Effet pour gérer la langue en fonction du chemin dans l'URL
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    switch (path) {
      case "en": {
        i18n.changeLanguage("en");
        break;
      }
      case "fr": {
        i18n.changeLanguage("fr");
        break;
      }
      default: {
        i18n.changeLanguage("fr");
      }
    }
  }, [location, i18n]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fr" />} />
      <Route path="/fr" element={<Weather />} />
      <Route path="/en" element={<Weather />} />
    </Routes>
  );
};

export default App;
