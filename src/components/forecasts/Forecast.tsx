import icons from "../../assets/icons";
import { DailyForecast } from "../../interfaces/weather-models";
import { dateToLocaleString } from "../../utilities/helpers";
import styles from "./forecasts.module.css";

interface IForecastProps {
  weather: DailyForecast;
  timeZone: string;
}

const Forecast = ({ weather, timeZone }: IForecastProps) => {
  const [weekday, date] = dateToLocaleString(new Date(weather.dt * 1000), {
    type: "date",
    weekday: "long",
    month: "short",
    day: "numeric",
  }).split(", ");

  return (
    <div className={styles.forecast}>
      <p className={styles.weekday}>{weekday}</p>
      <p>{date}</p>
      {weather && icons[weather.weather[0].icon || "n/a"]}
      <p className={styles.description}>{weather.weather[0].description}</p>
      <p>
        {Math.round(weather.temp.max)}°/{Math.round(weather.temp.min)}°
      </p>
    </div>
  );
};

export default Forecast;
