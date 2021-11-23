import icons from "../../assets/icons";
import { ReactComponent as SunRise } from "../../assets/sunrise.svg";
import { ReactComponent as SunSet } from "../../assets/sunset.svg";
import { ReactComponent as Sync } from "../../assets/sync.svg";
import { ReactComponent as MinTemp } from "../../assets/thermometer-colder.svg";
import { ReactComponent as MaxTemp } from "../../assets/thermometer-warmer.svg";
import { useWeatherContext } from "../../context/provider";
import global from "../../index.module.css";
import { default as countryCodes } from "../../utilities/country-codes.json";
import { dateToLocaleString } from "../../utilities/helpers";
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
    dateToLocaleString(dateTime, {
      type: "date",
      timeZone,
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const [time, meridiem] = dateToLocaleString(dateTime, {
    type: "time",
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).split(" ");

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
  refreshWeather: () => void;
}

const CurrentWeather = (props: ICurrentWeatherProps) => {
  const { weather, isDay, loading, error } = useWeatherContext();
  const current = weather?.current;
  const timeZone = weather?.forecast.timezone;
  const loaded = current && timeZone;

  return (
    <>
      {loaded && !error && (
        <div
          className={`${styles.current} ${isDay ? global.day : global.night}`}
        >
          <div className={styles.header}>
            <p>Current Weather</p>
            <Sync onClick={props.refreshWeather} />
          </div>
          <hr />
          <div className={`${styles.main} ${loading ? global.loading : ""}`}>
            <div className={global.spinner} />
            <div className={styles.left}>
              <div className={styles.temperature}>
                <p>{Math.round(current.main.temp)}°</p>
                <div className={styles.minmax}>
                  <div>
                    <MaxTemp />
                    {Math.round(current.main.temp_max)}°
                  </div>
                  <div>
                    <MinTemp />
                    {Math.round(current.main.temp_max)}°
                  </div>
                </div>
              </div>
              <p className={styles.feels}>
                but feels like... {Math.round(current.main.feels_like)}°
              </p>
              <div className={styles.weatherDescription}>
                {current && icons[current.weather[0].icon || "n/a"]}
                <span>{current.weather[0].description}</span>
              </div>
            </div>

            <span className={styles.divider} />

            <div className={styles.right}>
              <DateTimeComponent unix={Date.now() / 1000} timeZone={timeZone} />
              <p className={styles.location}>
                {current.name}, {codes[current.sys.country]}
              </p>
              <div className={styles.suntime}>
                <SunRise />
                <DateTimeComponent
                  unix={current.sys.sunrise}
                  timeZone={timeZone}
                  timeOnly
                />
                <SunSet />
                <DateTimeComponent
                  unix={current.sys.sunset}
                  timeZone={timeZone}
                  timeOnly
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentWeather;
