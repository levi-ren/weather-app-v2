import icons from "./assets/icons";
import { WeatherData } from "./interfaces/weather-models";
import styles from "./styles/current-weather.module.css";

interface ICurrentWeatherProps {
  weather: WeatherData;
}

const CurrentWeather = ({ weather }: ICurrentWeatherProps) => {
  console.log(weather);

  return (
    <div className={styles.current}>
      <div className="top">Current Weather</div>
      <hr />
      <div className={styles.main}>
        <p>
          {weather?.name} City, {weather?.sys.country}
        </p>
        <div className={styles.icon}>
          {weather && icons[weather.weather[0].icon || "n/a"]}
        </div>
        <p>{weather?.weather[0].description}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
