import React, { useState } from "react";
import axios from "axios";
import "./MainData.css";

export default function MainData(props) {
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [fixedTime, setFixedTime] = useState(null);

  function updateTime(timestamp) {
    let date = new Date(timestamp);
    let days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    setFixedTime(`${day}, ${hours}:${minutes}`);
  }

  function handleResponse(response) {
    setWeatherData({
      icon: response.data.weather[0].icon,
      temperature: Math.round(response.data.main.temp),
      tempMax: Math.round(response.data.main.temp_max),
      tempMin: Math.round(response.data.main.temp_min),
      pressure: response.data.main.pressure,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      windSpeed: response.data.wind.speed,
      /* time: response.data.dt * 1000 + response.data.timezone * 1000, */
      ready: true
    });
    updateTime(response.data.dt * 1000 + response.data.timezone * 1000);
  }

  let imgUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  if (weatherData.ready) {
    return (
      <div className="row form-group clearfix">
        <div className="form-inline weatherMain">
          <div className="col-4 leftData">
            <h4 className="leftData location">{props.city}</h4>
            <div className="leftData day-hour">{fixedTime}</div>
            <div className="leftData weather-description">
              {weatherData.description}
            </div>
            <div className="leftData temp-max-min">
              {weatherData.tempMax}º/{weatherData.tempMin}º
            </div>
          </div>
          <div className="col-4 float:left current-weather">
            <img src={imgUrl} className="weather-icon" alt="" />
            <div className="current-temperature">
              <strong>
                <span className="current-temperature-element" />
                {weatherData.temperature}º
              </strong>
            </div>
          </div>
          <ul className="col-4 weatherDetails">
            <br />
            <br />
            <li>
              Pressure: <span className="pressure" />
              {weatherData.pressure}mb
            </li>
            <li>
              Humidity: <span className="humidity" />
              {weatherData.humidity}%
            </li>
            <li>
              Wind: <span className="wind-speed" /> {weatherData.windSpeed}
              <span className="wind-units" />
              m/s
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let weatherApiUrl = `${apiUrl}weather?q=${props.city}&appid=${apiKey}&units=metric`;
    axios.get(weatherApiUrl).then(handleResponse);
    console.log(weatherApiUrl);
    return "Loading...";
  }
}
