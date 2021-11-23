import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import WeatherProvider from "./components/WeatherProvider";

ReactDOM.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
