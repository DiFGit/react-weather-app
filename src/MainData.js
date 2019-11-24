import React, { useState } from "react";
import axios from "axios";
import "./MainData.css";

export default function MainData(props) {
  let [temperature, setTemperature] = useState(null);
  let [icon, setIcon] = useState(null);
  let [tempMax, setTempMax] = useState(null);
  let [tempMin, setTempMin] = useState(null);
  let [time, setTime] = useState(null);
  let [description, setDescription] = useState(null);
  let [windSpeed, setWindSpeed] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [pressure, setPressure] = useState(null);

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

    setTime(`${day}, ${hours}:${minutes}`);
  }

  function handleResponse(response) {
    setIcon(response.data.weather[0].icon);
    setTemperature(Math.round(response.data.main.temp));
    setTempMax(Math.round(response.data.main.temp_max));
    setTempMin(Math.round(response.data.main.temp_min));
    setPressure(response.data.main.pressure);
    setHumidity(response.data.main.humidity);
    setDescription(response.data.weather[0].description);
    setWindSpeed(response.data.wind.speed);
    updateTime(response.data.dt * 1000 + response.data.timezone * 1000);
  }

  let imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  let city = "Lisbon";
  let apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
  let apiUrl = `https://api.openweathermap.org/data/2.5/`;
  let weatherApiUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(handleResponse);

  if (props.loaded) {
    return (
      <div className="row form-group clearfix">
        <div className="form-inline weatherMain">
          <div className="col-4 leftData">
            <h4 className="leftData location">{props.city}</h4>
            <div className="leftData day-hour">Tuesday, 00:45</div>
            <div className="leftData weather-description">clear sky</div>
            <div className="leftData temp-max-min">14º/18º</div>
          </div>
          <div className="col-4 float:left current-weather">
            <img
              src="https://openweathermap.org/img/wn/01n@2x.png" /* {imgUrl} */
              className="weather-icon"
              alt=""
            />
            <div className="current-temperature">
              <strong>
                <span className="current-temperature-element" />
                {props.temperature}º
              </strong>
            </div>
          </div>
          <ul className="col-4 weatherDetails">
            <br />
            <br />
            <li>
              Pressure: <span className="pressure" />
              1024 mb
            </li>
            <li>
              Humidity: <span className="humidity" />
              67%
            </li>
            <li>
              Wind: <span className="wind-speed" />2
              <span className="wind-units" />
              m/s
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row form-group clearfix">
        <div className="form-inline weatherMain">
          <div className="col-4 leftData">
            <h4 className="leftData location">{city}</h4>
            <div className="leftData day-hour">{time}</div>
            <div className="leftData weather-description">{description}</div>
            <div className="leftData temp-max-min">
              {tempMax}º/{tempMin}º
            </div>
          </div>
          <div className="col-4 float:left current-weather">
            <img src={imgUrl} className="weather-icon" alt="" />
            <div className="current-temperature">
              <strong>
                <span className="current-temperature-element" />
                {temperature}º
              </strong>
            </div>
          </div>
          <ul className="col-4 weatherDetails">
            <br />
            <br />
            <li>
              Pressure: <span className="pressure" />
              {pressure}mb
            </li>
            <li>
              Humidity: <span className="humidity" />
              {humidity}%
            </li>
            <li>
              Wind: <span className="wind-speed" /> {windSpeed}
              <span className="wind-units" />
              m/s
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
