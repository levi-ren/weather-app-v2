import { useEffect, useState } from "react";
import icons from "./assets/icons";
import { IWeatherData } from "./interfaces/weather-models";
import styles from "./styles/app.module.css";
import { fetchWeather } from "./utilities/helpers";

function App() {
  const [weather, setWeather] =
    useState<{ current: IWeatherData; forecast: any }>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        fetchWeather(latitude, longitude).then(setWeather)
    );
  }, []);

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.current}>
          {weather && icons[weather.current?.weather[0]?.icon || "n/a"]}
        </div>
        <div className={styles.forecast}></div>
      </div>
    </div>
  );
}

export default App;
