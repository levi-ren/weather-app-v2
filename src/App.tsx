import { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import { WeatherData } from "./interfaces/weather-models";
import styles from "./styles/app.module.css";
import { fetchWeather } from "./utilities/helpers";

function App() {
  const [weather, setWeather] =
    useState<{ current: WeatherData; forecast: any }>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        fetchWeather(latitude, longitude).then(setWeather)
    );
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {weather && <CurrentWeather weather={weather.current} />}
        <div className={styles.forecast}></div>
      </div>
    </div>
  );
}

export default App;
