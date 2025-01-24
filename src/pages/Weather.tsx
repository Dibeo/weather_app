import React, { useEffect, useState } from "react";
import CurrentWeather from "../components/Weather/CurrentWeather";
import ForecastWeather from "../components/Weather/ForecastWeather";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "../styles/pages/Weather.css";
import LocatedWeather from "../components/Weather/LocatedWeather";

const Weather: React.FC = () => {
  const { t } = useTranslation();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [apiKey] = useState<string>(import.meta.env.VITE_WEATHER_API_KEY);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Recherche de la ville en fonction du nom
  const searchCity = async (city: string) => {
    try {
      const geocodingUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await fetch(geocodingUrl);
      const data = await response.json();

      if (data.cod === 200) {
        setLatitude(data.coord.lat);
        setLongitude(data.coord.lon);
      } else {
        Swal.fire({
          title: t("error"),
          text: t("city_not_found"),
          imageUrl: "/no-location.png",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "City not found",
          customClass: {
            popup: "glassmorphic-popup",
            title: "white-text",
            htmlContainer: "white-text",
          },
          background: "rgba(255, 255, 255, 0.4)",
          willOpen: () => {
            const popup = Swal.getPopup();
            popup!.style.background = "rgba(255, 255, 255, 0.4)";
            popup!.style.backdropFilter = "blur(10px)";
            popup!.style.borderRadius = "20px";
            popup!.style.border = "none";
          },
        });
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      Swal.fire({
        title: t("error"),
        text: t("network_error"),
        imageUrl: "/no-location.png",
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "Error",
        customClass: {
          popup: "glassmorphic-popup",
          title: "white-text",
          htmlContainer: "white-text",
        },
        background: "rgba(255, 255, 255, 0.4)",
        willOpen: () => {
          const popup = Swal.getPopup();
          popup!.style.background = "rgba(255, 255, 255, 0.4)";
          popup!.style.backdropFilter = "blur(10px)";
          popup!.style.borderRadius = "20px";
          popup!.style.border = "none";
        },
      });
    }
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    searchCity(search);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        Swal.fire({
          title: t("error"),
          text: t("no_location"),
          imageUrl: "/no-location.png",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "No location",
          customClass: {
            popup: "glassmorphic-popup",
            title: "white-text",
            htmlContainer: "white-text",
          },
          background: "rgba(255, 255, 255, 0.4)",
          willOpen: () => {
            const popup = Swal.getPopup();
            popup!.style.background = "rgba(255, 255, 255, 0.4)";
            popup!.style.backdropFilter = "blur(10px)";
            popup!.style.borderRadius = "20px";
            popup!.style.border = "none";
          },
        });
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (!latitude || !longitude) {
    return (
      <div style={{ textAlign: "center", color: "white", marginTop: "50px" }}>
        <p>{t("loc_on_going")}...</p>
      </div>
    );
  }

  return (
    <>
      {latitude && longitude && (
        <>
          <CurrentWeather latitude={latitude} longitude={longitude} apiKey={apiKey} />
          <ForecastWeather latitude={latitude} longitude={longitude} apiKey={apiKey} />
        </>
      )}

      <LocatedWeather latitude={latitude} longitude={longitude} apiKey={apiKey} onSearch={handleSearch} />
    </>
  );
};

export default Weather;
