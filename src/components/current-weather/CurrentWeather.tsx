import icons from "../../assets/icons";
import { ReactComponent as SunRise } from "../../assets/sunrise.svg";
import { ReactComponent as SunSet } from "../../assets/sunset.svg";
import { ReactComponent as Sync } from "../../assets/sync.svg";
import { WeatherData } from "../../interfaces/weather-models";
import global from "../../styles/global.module.css";
import { default as countryCodes } from "../../utilities/country-codes.json";
import styles from "./current-weather.module.css";

const codes = countryCodes as { [key: string]: string };

interface IDateTimeComponentProps {
  unix: number;
  timeZone: string;
  timeOnly?: true;
}

const DateTimeComponent = (props: IDateTimeComponentProps) => {
  const { unix, timeZone, timeOnly } = props;
  const dateTime = new Date(unix * 1000);

  const date =
    !timeOnly &&
    dateTime.toLocaleDateString(navigator.language, {
      timeZone,
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const [time, meridiem] = dateTime
    .toLocaleTimeString(navigator.language, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(" ");

  return (
    <>
      <p className={styles.time}>
        {time}
        <span>{meridiem}</span>
      </p>
      {!timeOnly && <p className={styles.date}>{date}</p>}
    </>
  );
};

interface ICurrentWeatherProps {
  weather: WeatherData;
  timeZone: string;
  loading: boolean;
  refreshWeather: () => void;
}

const CurrentWeather = (props: ICurrentWeatherProps) => {
  const { weather, timeZone, loading, refreshWeather } = props;

  return (
    <div className={styles.current}>
      <div className={styles.header}>
        <p>Current Weather</p>
        <Sync onClick={refreshWeather} />
      </div>
      <hr />
      <div className={`${styles.main} ${loading ? global.loading : ""}`}>
        <div className={global.spinner} />
        <div className={styles.left}>
          <p className={styles.temperature}>{Math.round(weather.main.temp)}°</p>
          <p className={styles.feels}>
            but feels like... {Math.round(weather.main.feels_like)}°
          </p>
          <div className={styles.weatherDescription}>
            {weather && icons[weather.weather[0].icon || "n/a"]}
            <span>{weather.weather[0].description}</span>
          </div>
        </div>

        <span className={styles.divider} />

        <div className={styles.right}>
          <DateTimeComponent unix={Date.now() / 1000} timeZone={timeZone} />
          <p className={styles.location}>
            {weather.name}, {codes[weather.sys.country]}
          </p>
          <div className={styles.suntime}>
            <SunRise />
            <DateTimeComponent
              unix={weather.sys.sunrise}
              timeZone={timeZone}
              timeOnly
            />
            <SunSet />
            <DateTimeComponent
              unix={weather.sys.sunset}
              timeZone={timeZone}
              timeOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
