import React, { useEffect, useState } from "react";
import CurrentWeather from "../components/Weather/CurrentWeather";
import ForecastWeather from "../components/Weather/ForecastWeather";

const Weather: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [apiKey] = useState<string>(import.meta.env.VITE_WEATHER_API_KEY);

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
    getLocation();
  }, []);

  if (!latitude || !longitude) {
    return (
      <div style={{ textAlign: 'center', color: 'white', marginTop: '50px' }}>
        <p>Localisation en cours...</p>
      </div>
    );
  }
  return (
    <>
      <CurrentWeather latitude={latitude} longitude={longitude} apiKey={apiKey}/>
      <ForecastWeather latitude={latitude} longitude={longitude} apiKey={apiKey}/>
    </>
  );
};

export default Weather;
