import { ForecastData } from "./interfaces/weather-models";
import styles from "./styles/forecasts.module.css";

interface IForecastsProps {
  weather: ForecastData;
}

const Forecasts = ({ weather }: IForecastsProps) => {
  return (
    <div className={`${styles.forecast} loading`}>
      <div className="spinner" />
    </div>
  );
};

export default Forecasts;
