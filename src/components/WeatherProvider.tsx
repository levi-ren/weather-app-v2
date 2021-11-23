import { FC, useReducer } from "react";
import { WeatherContext } from "../context/provider";
import { weatherReducer } from "../context/reducers";

const hour = new Date().getHours();

const WeatherProvider: FC = ({ children }) => {
  const [reducer, dispatch] = useReducer(weatherReducer, {
    weather: undefined,
    hour,
    isDay: hour < 12 ? true : false,
    coordinates: undefined,
    location: "",
    loading: false,
    error: undefined,
  });
  const value = { ...reducer, dispatch };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export default WeatherProvider;
