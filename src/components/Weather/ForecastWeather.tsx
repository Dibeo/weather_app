import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import {
  CardStyled,
  CardBodyStyled,
  TitleStyled,
  TextStyled,
  IconStyled,
} from "../../styles/Components/Weather/WeatherCard";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface WeatherData {
  dt: number;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

interface WeatherProps {
  latitude: number;
  longitude: number;
  apiKey: string;
}

const ForecastWeather: React.FC<WeatherProps> = ({
  latitude,
  longitude,
  apiKey,
}) => {
  const { t } = useTranslation();
  const [forecast, setForecast] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&cnt=8&lang=fr`;

    const fetchForecast = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setForecast(data.list);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setLoading(false);
      }
    };

    fetchForecast();
  }, [latitude, longitude, apiKey]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
        <CircularProgress />
        <Typography variant="h6" gutterBottom>
          {t("loading_forecast")}
        </Typography>
      </div>
    );
  }

  return (
    <CardStyled show={true}>
      <CardBodyStyled>
        <Row className="justify-content-center">
          <Col xs={12}>
            <TitleStyled>{t("weather_forecast")}</TitleStyled>
            {forecast.map((elem, index) => {
              const date = new Date(elem.dt * 1000);
              const hours =
                date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
              const day =
                date.getUTCDate() === new Date().getUTCDate()
                  ? t("today")
                  : t("tomorrow");
              const description =
                elem.weather[0].description.charAt(0).toUpperCase() +
                elem.weather[0].description.slice(1);

              return (
                <Row
                  key={index}
                  className="align-items-center"
                  style={{ marginBottom: "10px" }}
                >
                  <Col xs={8}>
                    <TextStyled>
                      <strong>
                        {day} - {hours}:00
                      </strong>
                      <br />
                      <strong>{elem.main.temp}°C</strong>
                      <br />
                      {description}
                    </TextStyled>
                  </Col>
                  <Col xs={4} className="text-right">
                    <IconStyled
                      src={`https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}
                      alt={t("weather_icon_alt")}
                    />
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </CardBodyStyled>
    </CardStyled>
  );
};

export default ForecastWeather;
