import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Card, CardBody, CardTitle, CardText } from "react-bootstrap";
import { CircularProgress, Typography } from "@mui/material";
import "../../styles/Components/Weather/WeatherCard.css"

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
  sys: { country: string; sunrise: number; sunset: number };
}

const CurrentWeather: React.FC = () => {
  const { t } = useTranslation();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported or allowed.");
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeather = async () => {
        try {
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`
          );
          const weatherData: WeatherData = await weatherResponse.json();
          setWeather(weatherData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    getLocation();
  }, []);

  if (loading) {
    return (
      <Container className="loading-container">
        <CircularProgress />
        <Typography variant="h6" gutterBottom>
          Chargement de la météo...
        </Typography>
      </Container>
    );
  }

  return (
    <Card className="card-glassmorphism">
      <CardBody className="card-body-glassmorphism">
        <CardTitle className="card-title-glassmorphism">
          {weather?.name}, {weather?.sys.country}
        </CardTitle>
        <CardText className="card-text-glassmorphism">
          <strong>{weather?.main.temp}°C</strong>
          <br />
          {weather!.weather[0].description.charAt(0).toUpperCase() +
            weather!.weather[0].description.slice(1)}
        </CardText>
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      </CardBody>
    </Card>
  );
};

export default CurrentWeather;
