import React from "react";
import { useTranslation } from "react-i18next";

/**
 * This get the current weather from the API
 */
const CurrentWeather: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <p>{t("description")}</p>
    </>
  );
};

export default CurrentWeather;
