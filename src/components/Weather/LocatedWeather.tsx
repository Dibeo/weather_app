import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import {
  CardStyled,
  CardBodyStyled,
} from "../../styles/Components/Weather/WeatherCard";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
  sys: { country: string; sunrise: number; sunset: number };
}

interface WeatherProps {
  latitude: number;
  longitude: number;
  apiKey: string;
  onSearch: (searchTerm: string) => void; // Fonction pour envoyer au parent
}

const LocatedWeather: React.FC<WeatherProps> = ({
  latitude,
  longitude,
  apiKey,
  onSearch, // fonction passée par le parent
}) => {
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCard, setShowCard] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(""); // État local pour l'input

  useEffect(() => {
    const currentLang = i18n.language;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${currentLang}`;

    const fetchWeather = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data: WeatherData = await response.json();
        setWeather(data);
        setShowCard(true);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude, apiKey, i18n.language]);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
        <CircularProgress />
        <Typography variant="h6" gutterBottom>
          {t("loading_current")}...
        </Typography>
      </div>
    );
  }

  if (!weather) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
        <Typography variant="h6" gutterBottom>
          {t("error_loading_weather")}
        </Typography>
      </div>
    );
  }

  return (
    <CardStyled show={showCard} id="location">
      <CardBodyStyled>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("search")}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ color: "white" }}
        />
        <IconButton
          style={{ color: "white" }}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </CardBodyStyled>
    </CardStyled>
  );
};

export default LocatedWeather;
