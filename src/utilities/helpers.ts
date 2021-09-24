import axios from "axios";

axios.defaults.baseURL = "https://api.openweathermap.org/";

const key = process.env.REACT_APP_API_KEY;

const api = (lat: number, lon: number) => {
  return [
    axios.get(
      `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    ),
    axios.get(`data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`),
  ];
};

export const fetchWeather = (lat: number, lon: number) => {
  return axios.all(api(lat, lon)).then(
    axios.spread((weather, forecast) => {
      return { current: weather.data, forecast: forecast.data };
    })
  );
};
