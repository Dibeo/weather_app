import React, { useEffect, useState } from "react";
import CurrentWeather from "../components/Weather/CurrentWeather";
import ForecastWeather from "../components/Weather/ForecastWeather";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "../styles/pages/Weather.css";

const Weather: React.FC = () => {
  const { t } = useTranslation();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [apiKey] = useState<string>(import.meta.env.VITE_WEATHER_API_KEY);

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
      <CurrentWeather
        latitude={latitude}
        longitude={longitude}
        apiKey={apiKey}
      />
      <ForecastWeather
        latitude={latitude}
        longitude={longitude}
        apiKey={apiKey}
      />
    </>
  );
};

export default Weather;
