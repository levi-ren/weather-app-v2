import { ForecastData } from "../../interfaces/weather-models";
import global from "../../styles/global.module.css";
import Forecast from "./Forecast";
import styles from "./forecasts.module.css";

interface IForecastsProps {
  weather: ForecastData;
  loading?: true | false;
}

const Forecasts = ({ weather, loading }: IForecastsProps) => {
  console.log(weather);
  return (
    <div className={`${styles.forecasts} ${loading ? global.loading : ""}`}>
      <div className={global.spinner} />
      <div className={styles.header}>
        <p>Forecasts</p>
      </div>
      <hr />
      <div className={styles.main}>
        {weather.daily.slice(0, 5).map((forecast, i) => (
          <Forecast key={i} weather={forecast} timeZone={weather.timezone} />
        ))}
      </div>
    </div>
  );
};

export default Forecasts;
