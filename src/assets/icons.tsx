import { ReactComponent as ClearDay } from "./clear-day.svg";
import { ReactComponent as ClearNight } from "./clear-night.svg";
import { ReactComponent as Cloudy } from "./cloudy.svg";
import { ReactComponent as Drizzle } from "./drizzle.svg";
import { ReactComponent as Mist } from "./mist.svg";
import { ReactComponent as NA } from "./not-available.svg";
import { ReactComponent as OvercastDay } from "./overcast-day.svg";
import { ReactComponent as OvercastNight } from "./overcast-night.svg";
import { ReactComponent as RainDay } from "./partly-cloudy-day-rain.svg";
import { ReactComponent as SnowDay } from "./partly-cloudy-day-snow.svg";
import { ReactComponent as PartlyCloudyDay } from "./partly-cloudy-day.svg";
import { ReactComponent as RainNight } from "./partly-cloudy-night-rain.svg";
import { ReactComponent as SnowNight } from "./partly-cloudy-night-snow.svg";
import { ReactComponent as PartlyCloudyNight } from "./partly-cloudy-night.svg";
import { ReactComponent as ThunderStormDay } from "./thunderstorms-day.svg";
import { ReactComponent as ThunderStormNight } from "./thunderstorms-night.svg";

const icons = {
  "01d": <ClearDay />,
  "01n": <ClearNight />,
  "02d": <PartlyCloudyDay />,
  "02n": <PartlyCloudyNight />,
  "03n": <Cloudy />,
  "03d": <Cloudy />,
  "04d": <OvercastDay />,
  "04n": <OvercastNight />,
  "09d": <Drizzle />,
  "09n": <Drizzle />,
  "10d": <RainDay />,
  "10n": <RainNight />,
  "11d": <ThunderStormDay />,
  "11n": <ThunderStormNight />,
  "13d": <SnowDay />,
  "13n": <SnowNight />,
  "50d": <Mist />,
  "50n": <Mist />,
  "n/a": <NA />,
};

export type WeatherCodes = keyof typeof icons;

export default icons;
