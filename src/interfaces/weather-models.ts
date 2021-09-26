import { WeatherCodes } from "../assets/icons";

export interface WeatherData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: WeatherCodes;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
  coord: { lat: number; lon: number };
}
