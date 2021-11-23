import { useWeatherContext } from "../../context/provider";
import global from "../../index.module.css";
import Forecast from "./Forecast";
import styles from "./forecasts.module.css";

const Forecasts = () => {
  const { weather, isDay, loading, error } = useWeatherContext();
  const forecast = weather?.forecast;

  return (
    <>
      {forecast && !error && (
        <div
          className={`${styles.forecasts} ${loading ? global.loading : ""} ${
            isDay ? global.day : global.night
          }`}
        >
          <div className={global.spinner} />
          <div className={styles.header}>
            <p>Forecasts</p>
          </div>
          <hr />
          <div className={styles.main}>
            {forecast.daily.slice(0, 5).map((weather, i) => (
              <Forecast
                key={i}
                weather={weather}
                timeZone={forecast.timezone}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Forecasts;
