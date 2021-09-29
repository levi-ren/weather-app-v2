import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import afternoon from "../assets/afternoon.svg";
import day from "../assets/day.svg";
import night from "../assets/night.svg";
import { ForecastData, WeatherData } from "../interfaces/weather-models";
import { fetchWeather, Options, toCoordinates } from "../utilities/helpers";
import styles from "./app.module.css";
import CurrentWeather from "./current-weather/CurrentWeather";
import Forecasts from "./forecasts/Forecasts";
import Search from "./search/Search";
import { Footer, Header } from "./Spacers";

function App() {
  const [coords, setCoords] = useState<Number[]>();
  const [weather, setWeather] =
    useState<{ current: WeatherData; forecast: ForecastData }>();
  const [location, setLocation] = useState("");
  const [units] = useState("Metric");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        .catch((err) =>
          setError(err.cod === "404" ? "Invalid location" : err.message)
        )
        .finally(() => {
          setLoading(false);
        });
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
      if (!location) {
        setError("Please enter a value");
        return;
      }
      const coords = toCoordinates(location);
      if (coords === 0) {
        refresh({ city: location, units });
      } else if (coords === -1) {
        setError("Invalid coordinates");
      } else setCoords(coords);
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

  useEffect(() => {
    if (error) {
      setWeather(undefined);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const searchProps = {
    error,
    loading,
    location,
    onSearch,
    onEnter,
    getLocation,
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <Search {...searchProps} />
        {weather && !error && (
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

      <img src={day} hidden alt="" />
      <img src={night} hidden alt="" />
      <img src={afternoon} hidden alt="" />
    </div>
  );
}

export default App;
