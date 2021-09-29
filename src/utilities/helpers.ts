import axios from "axios";
import { ForecastData, WeatherData } from "../interfaces/weather-models";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";

const key = process.env.REACT_APP_API_KEY;

axios.interceptors.response.use(
  (resp) => resp,
  (err) => {
    throw err.response.data;
  }
);

export interface Options {
  city?: string;
  coordinates?: Number[];
  units: string;
}

const paramBuilder = ({ city, coordinates, units }: Options) => {
  const params = {
    ...(coordinates && { lat: coordinates[0]?.toString() }),
    ...(coordinates && { lon: coordinates[1]?.toString() }),
    ...(city && { q: city }),
    units,
    appid: key?.toString() || "",
  };

  return new URLSearchParams(params).toString();
};

const apiWeather = (params: string) => {
  return axios.get<WeatherData>(`/weather?${params}`);
};

const apiOneCall = (params: string) => {
  return axios.get<ForecastData>(
    `/onecall?${params}&exclude=minutely,hourly,alerts`
  );
};

const searchByCity = (params: string, units: string) => {
  return apiWeather(params).then((resp) => {
    const {
      data: {
        coord: { lat, lon },
      },
    } = resp;

    return apiOneCall(paramBuilder({ coordinates: [lat, lon], units })).then(
      (respo) => ({ current: resp.data, forecast: respo.data })
    );
  });
};

export const fetchWeather = (options: Options) => {
  const searchParams = paramBuilder(options);

  if (options.city) {
    return searchByCity(searchParams, options.units);
  }

  return Promise.all([apiWeather(searchParams), apiOneCall(searchParams)]).then(
    ([weather, forecast]) => ({
      current: weather.data,
      forecast: forecast.data,
    })
  );
};

export const checkAndParseToCoordinates = (x: string, y: string) => {
  const lat = parseFloat(x);
  const lon = parseFloat(y);
  return !isNaN(lat) &&
    !isNaN(lon) &&
    lat <= 90 &&
    lat >= -90 &&
    lon <= 180 &&
    lon >= -180
    ? [lat, lon]
    : false;
};

export const toCoordinates = (location: string) => {
  const coordinates = location.split(",");
  if (coordinates.length !== 2) {
    return 0;
  }
  const [x, y] = coordinates;
  const lat = parseFloat(x);
  const lon = parseFloat(y);
  if (isNaN(lat) || isNaN(lon)) {
    return 0;
  }
  if (!(lat <= 90 && lat >= -90) || !(lon <= 180 && lon >= -180)) {
    return -1;
  }
  return [lat, lon];
};

export const dateToLocaleString = (
  date: Date,
  { type, ...options }: Intl.DateTimeFormatOptions & { type: "date" | "time" }
) =>
  type === "date"
    ? date.toLocaleDateString(navigator.language, options)
    : date.toLocaleTimeString(navigator.language, options);
