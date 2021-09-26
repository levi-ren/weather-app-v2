import { ReactComponent as Pressure } from "./assets/barometer.min.svg";
import { ReactComponent as Humidity } from "./assets/humidity.svg";
import icons from "./assets/icons";
import { ReactComponent as SunRise } from "./assets/sunrise.svg";
import { ReactComponent as SunSet } from "./assets/sunset.svg";
import { ReactComponent as Sync } from "./assets/sync.svg";
import { ReactComponent as LowTemp } from "./assets/thermometer-colder.svg";
import { ReactComponent as HighTemp } from "./assets/thermometer-warmer.svg";
import { WeatherData } from "./interfaces/weather-models";
import styles from "./styles/current-weather.module.css";
import { default as countryCodes } from "./utilities/country-codes.json";

const codes = countryCodes as { [key: string]: string };

interface ICurrentWeatherProps {
  weather: WeatherData;
  refreshWeather?: () => void;
}

const createTime = (epoch: number) => {
  return new Date(epoch * 1000).toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CurrentWeather = ({ weather, refreshWeather }: ICurrentWeatherProps) => {
  console.log(weather);

  return (
    <div className={styles.current}>
      <div className={styles.header}>
        <p>Current Weather</p>
        <Sync onClick={refreshWeather} />
      </div>
      <hr />
      <div className={styles.main}>
        <div className={styles.left}>
          <p>
            {weather?.name} City, {codes[weather.sys.country]}
          </p>
          <p className={styles.temp}>{Math.round(weather.main.temp)}°</p>
          <div className={styles.weather}>
            <div className={styles.icon}>
              {weather && icons[weather.weather[0].icon || "n/a"]}
            </div>
            <span>{weather?.weather[0].description}</span>
          </div>
          <div className={styles.suntiming}>
            <div className={styles.suntime}>
              <p>Sunrise:</p>
              <div>
                <div className={styles.icon}>
                  <SunRise />
                </div>

                <p>{createTime(weather.sys.sunrise)}</p>
              </div>
            </div>
            <div className={styles.suntime}>
              <p>Sunset:</p>
              <div>
                <div className={styles.icon}>
                  <SunSet />
                </div>

                <p>{createTime(weather.sys.sunset)}</p>
              </div>
            </div>
          </div>
        </div>

        <span className={styles.divider} />

        <div className={styles.right}>
          <p>But feels like...</p>
          <p className={styles.temp}>{Math.round(weather.main.feels_like)}°</p>
          <div className={styles.temperatures}>
            <div>
              <p>Highest:</p>
              <div>
                <div className={styles.icon}>
                  <HighTemp />
                </div>

                <p>{Math.round(weather.main.temp_max)}°</p>
              </div>
            </div>
            <div>
              <p>Lowest:</p>
              <div>
                <div className={styles.icon}>
                  <LowTemp />
                </div>

                <p>{Math.round(weather.main.temp_min)}°</p>
              </div>
            </div>
          </div>
          <div className={styles.misc}>
            <div>
              <p>Humidity:</p>
              <div>
                <div className={styles.icon}>
                  <Humidity />
                </div>
                <p>{weather.main.humidity}</p>
              </div>
            </div>
            <div>
              <p>Pressure:</p>
              <div>
                <div className={styles.icon}>
                  <Pressure />
                </div>
                <p>
                  {weather.main.pressure} <sup>hPa</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
