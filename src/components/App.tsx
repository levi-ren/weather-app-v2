import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import afternoon from "../assets/afternoon.svg";
import day from "../assets/day.svg";
import night from "../assets/night.svg";
import { useWeatherContext } from "../context/provider";
import { Actions } from "../context/reducers";
import { fetchWeather, Options, toCoordinates } from "../utilities/helpers";
import styles from "./app.module.css";
import CurrentWeather from "./current-weather/CurrentWeather";
import Forecasts from "./forecasts/Forecasts";
import Search from "./search/Search";
import { Footer, Header } from "./Spacers";

function App() {
  const [units] = useState("Metric");

  const { weather, hour, location, coordinates, loading, dispatch } =
    useWeatherContext();

  const getLocation = () => {
    !loading &&
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          dispatch({
            type: Actions.SetCoordinates,
            payload: [latitude, longitude],
          }),
        () =>
          dispatch({
            type: Actions.Error,
            payload: "please allow access to your location",
          })
      );
  };

  const refresh = useCallback(
    (options: Options) => {
      dispatch({ type: Actions.Load });
      setTimeout(() => {
        fetchWeather(options)
          .then((resp) => dispatch({ type: Actions.Success, payload: resp }))
          .catch((err) =>
            dispatch({ type: Actions.Failed, payload: err.message })
          );
      }, 1000);
    },
    [dispatch]
  );

  const sync = () => {
    if (weather) {
      const { lat, lon } = weather.current.coord;
      refresh({ coordinates: [lat, lon], units });
    }
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: Actions.SetLocation, payload: e.target.value });
    // setLocation(e.target.value);
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.includes("Enter")) {
      if (!location.trim()) {
        console.log("object");
        dispatch({ type: Actions.Error, payload: "Please enter a value" });
        return;
      }
      const coords = toCoordinates(location);
      if (coords === 0) {
        refresh({ city: location, units });
      } else if (coords === -1) {
        dispatch({ type: Actions.Error, payload: "Invalid coordinates" });
      } else dispatch({ type: Actions.SetCoordinates, payload: coords });
    }
  };

  useEffect(() => {
    coordinates && refresh({ coordinates, units });
  }, [coordinates, units, refresh]);

  useEffect(() => {
    if (hour < 12) {
      document.body.style.backgroundImage = `url(${day})`;
    } else if (hour < 18) {
      document.body.style.backgroundImage = `url(${afternoon})`;
    } else {
      document.body.style.backgroundImage = `url(${night})`;
    }
  }, [hour]);

  const searchProps = {
    onSearch,
    onEnter,
    getLocation,
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <Search {...searchProps} />
        <>
          <CurrentWeather refreshWeather={sync} />
          <Forecasts />
          <Footer />
        </>
      </div>

      <img src={day} hidden alt="" />
      <img src={night} hidden alt="" />
      <img src={afternoon} hidden alt="" />
    </div>
  );
}

export default App;
