import { CurrentWeather } from "../interfaces/weather-models";
import { default as countryCodes } from "../utilities/country-codes.json";

const codes = countryCodes as { [key: string]: string };

export enum Actions {
  Load = "LOAD",
  Success = "LOAD_SUCCESS",
  Failed = "LOAD_FAILED",
  SetCoordinates = "SET_COORDINATES",
  SetLocation = "SET_LOCATION",
  Error = "ERROR",
}

export interface IWeatherReducer {
  weather?: CurrentWeather;
  hour: number;
  isDay: boolean;
  coordinates?: number[];
  location: string;
  loading: boolean;
  error: any;
}

export const weatherReducer = (
  state: IWeatherReducer,
  action: { type: Actions; payload?: any }
): IWeatherReducer => {
  console.log(action.type);
  switch (action.type) {
    case Actions.Load: {
      return { ...state, error: undefined, loading: true };
    }
    case Actions.Success: {
      const weather = action.payload;
      const dt = new Date(weather.current.dt * 1000).toLocaleTimeString(
        navigator.language,
        { timeZone: weather.forecast.timezone, hour: "numeric", hour12: false }
      );

      const hour = parseInt(dt);
      const isDay = hour < 12 ? true : false;

      return {
        ...state,
        weather: action.payload,
        hour,
        isDay,
        location: `${weather.current.name}, ${
          codes[weather.current.sys.country]
        }`,
        error: undefined,
        loading: false,
      };
    }
    case Actions.Failed: {
      return {
        ...state,
        weather: undefined,
        error: action.payload,
        location: "",
        coordinates: undefined,
        loading: false,
      };
    }
    case Actions.SetCoordinates: {
      return { ...state, coordinates: action.payload };
    }
    case Actions.SetLocation: {
      return { ...state, location: action.payload, error: undefined };
    }
    case Actions.Error: {
      return {
        ...state,
        weather: undefined,
        error: action.payload,
        location: "",
        coordinates: undefined,
        loading: false,
      };
    }

    default:
      return state;
  }
};
