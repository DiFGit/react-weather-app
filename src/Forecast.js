import React, { useState } from "react";
import axios from "axios";
import "./Forecast.css";

export default function Forecast(props) {
  let [forecastData, setForecastData] = useState({ ready: false });
  let [forecastDay, setForecastDay] = useState(null);

  function formatForecastDay() {
    let date = new Date();
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastWeekDay = days[day + 1];
    if (day === 6) {
      forecastWeekDay = days[0];
    }
    setForecastDay(forecastWeekDay);
  }
  function getForecastData(response) {
    const forecast = response.data.list[0];
    setForecastData({
      forecastIconUrl: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
      temperature: Math.round(forecast.main.temp),
      tempMax: Math.round(forecast.main.temp_max),
      tempMin: Math.round(forecast.main.temp_min),
      ready: true
    });
    formatForecastDay(forecast.dt * 1000 + response.data.city.timezone * 1000);
  }

  if (forecastData.ready && props.units === "imperial") {
    let temperature = Math.round((forecastData.temperature * 9) / 5 + 32);
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          <div className="col-auto">
            <small>{forecastDay}</small>
            <img
              src={forecastData.forecastIconUrl}
              className="forecastIcon"
              alt=""
            />
            <small>{temperature}</small>
          </div>
          <div className="col-auto">
            <small>Tue</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>28º</small>
          </div>
          <div className="col-auto">
            <small>Wed</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>24º</small>
          </div>
          <div className="col-auto">
            <small>Thu</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>26º</small>
          </div>
          <div className="col-auto">
            <small>Fri</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>28º</small>
          </div>
        </div>
      </footer>
    );
  }
  if (forecastData.ready && props.units === "metric") {
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          <div className="col-auto">
            <small>{forecastDay}</small>
            <img
              src={forecastData.forecastIconUrl}
              className="forecastIcon"
              alt=""
            />
            <small>{forecastData.temperature}</small>
          </div>
          <div className="col-auto">
            <small>Tue</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>28º</small>
          </div>
          <div className="col-auto">
            <small>Wed</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>24º</small>
          </div>
          <div className="col-auto">
            <small>Thu</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>26º</small>
          </div>
          <div className="col-auto">
            <small>Fri</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>28º</small>
          </div>
        </div>
      </footer>
    );
  } else {
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let apiForecastUrl = `${apiUrl}forecast?q=${props.city}&appid=${apiKey}&units=metric`;
    axios.get(apiForecastUrl).then(getForecastData);
    /* .catch(handleErrors) */
    return <div>"Loading"</div>;
  }
}
