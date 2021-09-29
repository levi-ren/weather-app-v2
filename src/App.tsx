import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import afternoon from "./assets/afternoon.svg";
import day from "./assets/day.svg";
import night from "./assets/night.svg";
import { ReactComponent as Pin } from "./assets/pin.svg";
import { ReactComponent as Search } from "./assets/search.svg";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecasts from "./components/forecasts/Forecasts";
import { Footer, Header } from "./components/Spacers";
import { ForecastData, WeatherData } from "./interfaces/weather-models";
import styles from "./styles/app.module.css";
import global from "./styles/global.module.css";
import {
  checkAndParseToCoordinates,
  fetchWeather,
  Options,
} from "./utilities/helpers";

function App() {
  const input = useRef<HTMLInputElement>(null);
  const [coords, setCoords] = useState<Number[]>();
  const [weather, setWeather] =
    useState<{ current: WeatherData; forecast: ForecastData }>();
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("Metric");
  const [loading, setLoading] = useState(false);

  const focusInput = () => {
    input.current?.focus();
  };

  const getLocation = () => {
    !loading &&
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          setCoords([latitude, longitude])
      );
  };

  const refresh = (options: Options) => {
    setLoading(true);
    setTimeout(() => {
      fetchWeather(options)
        .then(setWeather)
        .finally(() => setLoading(false));
    }, 1000);
  };

  const sync = () => {
    if (weather) {
      const { lat, lon } = weather.current.coord;
      refresh({ coordinates: [lat, lon], units });
    }
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.includes("Enter")) {
      const value = location.split(",");
      if (value.length === 2) {
        const parsedCoords = checkAndParseToCoordinates(value[0], value[1]);
        if (parsedCoords) {
          setCoords(parsedCoords);
          return;
        }
      }
      refresh({ city: location, units });
    }
  };

  useEffect(() => {
    coords && refresh({ coordinates: coords, units });
  }, [coords, units]);

  useEffect(() => {
    if (weather) {
      const dt = new Date(weather.current.dt * 1000).toLocaleTimeString(
        navigator.language,
        { timeZone: weather.forecast.timezone, hour: "numeric", hour12: false }
      );

      const hour = parseInt(dt);

      if (hour < 12) {
        document.body.style.backgroundImage = `url(${day})`;
      } else if (hour < 18) {
        document.body.style.backgroundImage = `url(${afternoon})`;
      } else {
        document.body.style.backgroundImage = `url(${night})`;
      }
    }
  }, [weather]);

  return (
    <div className={styles.app}>
      <img src={day} hidden alt="" />
      <img src={night} hidden alt="" />
      <img src={afternoon} hidden alt="" />
      <div className={styles.container}>
        <Header />
        <div className={`${styles.search} ${loading ? global.loading : ""}`}>
          <div className={global.spinner}></div>
          <Search onClick={focusInput} />
          <input
            type="text"
            name="search"
            ref={input}
            placeholder="Enter a city name"
            onChange={onSearch}
            value={location}
            onKeyDown={onEnter}
            disabled={loading}
          />
          <Pin onClick={getLocation} />
        </div>
        {weather && (
          <>
            <CurrentWeather
              weather={weather.current}
              timeZone={weather.forecast.timezone}
              loading={loading}
              refreshWeather={sync}
            />
            <Forecasts weather={weather.forecast} loading={loading} />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
