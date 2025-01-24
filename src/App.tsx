import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Weather from "./pages/Weather";
import Navbar from "./components/NavBar";
import languages from "./lang/lang";
import "./styles/App.css";

const App: React.FC = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    i18n.changeLanguage(path);
    document.title = t("title");
  }, [location, i18n]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/fr" />} />
        {languages.map((language) => (
          <Route key={language.code} path={`/${language.code}`} element={<Weather />} />
        ))}
      </Routes>
    </>
  );
};

export default App;
