import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ReactComponent as Pin } from "./assets/pin.svg";
import { ReactComponent as Search } from "./assets/search.svg";
import CurrentWeather from "./CurrentWeather";
import { WeatherData } from "./interfaces/weather-models";
import { Footer, Header } from "./Spacers";
import styles from "./styles/app.module.css";
import {
  checkAndParseToCoordinates,
  fetchWeather,
  Options,
} from "./utilities/helpers";

function App() {
  const input = useRef<HTMLInputElement>(null);
  const [coords, setCoords] = useState<Number[]>();
  const [weather, setWeather] =
    useState<{ current: WeatherData; forecast: any }>();
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("Metric");

  const focusInput = () => {
    input.current?.focus();
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => setCoords([latitude, longitude])
    );
  };

  const refresh = (options: Options) => {
    fetchWeather(options).then(setWeather);
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.includes("Enter")) {
      const value = location.split(",");
      if (value.length === 2) {
        const parsedCoords = checkAndParseToCoordinates(value[0], value[1]);
        parsedCoords && setCoords(parsedCoords);
        return;
      }
      refresh({ city: location, units });
    }
  };

  useEffect(() => {
    coords && refresh({ coordinates: coords, units });
  }, [coords, units]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <div className={styles.search}>
          <Search onClick={focusInput} />
          <input
            type="text"
            name="search"
            ref={input}
            placeholder="Enter a city name"
            onChange={onSearch}
            value={location}
            onKeyDown={onEnter}
          />
          <Pin onClick={getLocation} id={styles.pin} />
        </div>
        {weather && (
          <>
            <CurrentWeather weather={weather.current} />
            <div className={styles.forecast}></div>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
