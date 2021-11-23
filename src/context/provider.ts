import { createContext, useContext } from "react";
import { IWeatherContext } from "../interfaces/context-models";

export const WeatherContext = createContext<IWeatherContext>({
  weather: undefined,
  hour: new Date().getHours(),
  isDay: true,
  coordinates: [],
  location: "string",
  loading: false,
  error: undefined,
  dispatch: () => {},
});

WeatherContext.displayName = "Weather Context";

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeatherContext must be used within a Weather Provider");
  }
  return context;
};
