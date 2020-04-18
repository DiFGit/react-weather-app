import React, { useState, useEffect } from "react";
import axios from "axios";
import ForecastDays from "./ForecastDays";
import "./Forecast.css";

export default function Forecast(props) {
  let [forecast, setForecast] = useState({ ready: false });
  let units = props.units;
  console.log(props.weatherData.city);

  function handleForecastResponse(response) {
    setForecast({
      data: response.data,
      city: response.data.city.name,
      date: response.data.list[0].dt,
      timezone: response.data.city.timezone,
      ready: true,
    });
    console.log(response.data.city.name);
  }

  useEffect(
    function getForecastData() {
      const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
      const apiUrl = `https://api.openweathermap.org/data/2.5/`;
      let apiForecastUrl = `${apiUrl}forecast?q=${props.weatherData.city}&appid=${apiKey}&units=metric`;
      axios.get(apiForecastUrl).then(handleForecastResponse);
    },
    [props.weatherData.city]
  );

  if (forecast.city === props.weatherData.city) {
    return (
      <ForecastDays
        weatherData={props.weatherData}
        forecastData={forecast}
        units={units}
      />
    );
  } else {
    return <div>"Loading..."</div>;
  }
}
