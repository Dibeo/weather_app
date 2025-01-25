import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CardBodyStyled,
  CardStyled,
  TextStyled,
  TitleStyled,
} from "../../styles/Components/Weather/WeatherCard";

const CadranSolaire: React.FC = () => {
  const startHour = 7;
  const startMinute = 15;
  const endHour = 19;
  const endMinute = 30;

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  if (endTotalMinutes <= startTotalMinutes) {
    throw new Error("L'heure de fin doit être après l'heure de début.");
  }

  const totalRange = endTotalMinutes - startTotalMinutes;

  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  const [currentMinute, setCurrentMinute] = useState<number>(
    new Date().getMinutes()
  );

  const calculateNeedleAngle = (hour: number, minute: number): number => {
    const currentTotalMinutes = hour * 60 + minute;

    const positionInRange = currentTotalMinutes - startTotalMinutes;
    const ratio = positionInRange / totalRange;

    const angle = ratio * 180 - 90;

    return angle;
  };

  const needleAngle = calculateNeedleAngle(currentHour, currentMinute);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentMinute(now.getMinutes());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <CardStyled show={true} className="container text-center mt-5">
      <CardBodyStyled>
        <TitleStyled>Cadran Solaire</TitleStyled>
        <TextStyled
          className="position-relative mx-auto"
          style={{
            width: "300px",
            height: "150px",
            backgroundImage: "url('/sundial.png')",
            backgroundRepeat: "none",
            backgroundSize: "cover",
          }}
        >
          <div
            className="position-absolute bg-dark"
            style={{
              width: "4px",
              height: "140px",
              bottom: "0px",
              left: "50%",
              transform: `translateX(-50%) rotate(${needleAngle}deg)`,
              transformOrigin: "bottom center",
              borderRadius: "2px",
            }}
          ></div>

          {[
            { hour: startHour, minute: startMinute },
            { hour: endHour, minute: endMinute },
          ]
            .sort((a, b) => a.hour * 60 + a.minute - (b.hour * 60 + b.minute))
            .map((time, index) => {
              const totalMinutes = time.hour * 60 + time.minute;
              const angle =
                ((totalMinutes - startTotalMinutes) / totalRange) * 180 - 90;
              const x = 150 + 140 * Math.cos((angle + 90) * (Math.PI / 180));
              const y = 150 - 140 * Math.sin((angle + 90) * (Math.PI / 180));

              return (
                <TextStyled
                  key={index}
                  className="position-absolute text-dark"
                  style={{
                    width: "30px",
                    height: "30px",
                    top: `${y}px`,
                    left: `${x}px`,
                    transform: "translate(-50%, -50%)",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {time.hour}h
                  {time.minute > 9 ? time.minute : `0${time.minute}`}
                </TextStyled>
              );
            })}
        </TextStyled>
      </CardBodyStyled>
    </CardStyled>
  );
};

export default CadranSolaire;
