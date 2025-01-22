import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import {
  CardStyled,
  CardBodyStyled,
  TitleStyled,
  TextStyled,
  IconStyled,
} from "../../styles/Components/Weather/WeatherCard";

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
}

const CurrentWeather: React.FC<WeatherProps> = ({
  latitude,
  longitude,
  apiKey,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`
        );
        const weatherData: WeatherData = await weatherResponse.json();
        setWeather(weatherData);
        setLoading(false);
        setShowCard(true);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
        <CircularProgress />
        <Typography variant="h6" gutterBottom>
          Chargement de la météo...
        </Typography>
      </div>
    );
  }

  return (
    <CardStyled show={showCard}>
      <CardBodyStyled>
        <TitleStyled>
          {weather?.name}, {weather?.sys.country}
        </TitleStyled>
        <TextStyled>
          <strong>{weather?.main.temp}°C</strong>
          <br />
          {weather!.weather[0].description.charAt(0).toUpperCase() +
            weather!.weather[0].description.slice(1)}
        </TextStyled>
        <IconStyled
          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      </CardBodyStyled>
    </CardStyled>
  );
};

export default CurrentWeather;
