import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
import MainData from "./MainData";

export default function WeatherApp(props) {
  let [city, setCity] = useState(props.defaultCity);
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
      city: response.data.name,
      ready: true
    });
    setCity(response.data.name);
    updateTime(response.data.dt * 1000 + response.data.timezone * 1000);
  }

  let iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  function getCityData() {
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let weatherApiUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(weatherApiUrl).then(handleResponse);
  }

  function getLocalData(position) {
    let currentPosition = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    let apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${currentPosition}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(getLocalData);
  }

  function updateInput(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getCityData();
  }

  if (weatherData.ready) {
    return (
      <div>
        <div className="row clearfix">
          <div className="form-group">
            <form className="form-inline searchForm" onSubmit={handleSubmit}>
              <input
                type="search"
                placeholder="Enter city"
                className="col-5 mr-2 search-engine"
                autoComplete="off"
                onChange={updateInput}
              />
              <input
                type="submit"
                value="🔍"
                className="btn btn-sm search-glass"
              />

              <div className="icon local-icon">
                <button
                  className="col-2 btn btn-sm ml-2 mr-5 current-location"
                  onClick={getCurrentLocation}
                >
                  <i className="fas fa-map-marker-alt local-icon " />
                </button>
              </div>
              <div className="units-links">
                <a href="/" className="active btn btn-lg units celsius">
                  C{" "}
                </a>
                |
                <a href="/" className="inactive btn btn-lg units fahrenheit">
                  F{" "}
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <MainData
            city={city}
            weatherData={weatherData}
            iconUrl={iconUrl}
            fixedTime={fixedTime}
          />
        </div>
        <div className="forecast">
          <small className="forecastDescription">Around this time, on</small>
          <footer className="forecastBox">
            <div className="row justify-content-center forecast">
              <div className="col-2">
                <small>Mon</small>
                <img
                  src="https://www.accuweather.com/images/weathericons/3.svg"
                  className="forecastIcon"
                  alt=""
                />
                <small>28º</small>
              </div>
              <div className="col-2">
                <small>Tue</small>
                <img
                  src="https://www.accuweather.com/images/weathericons/3.svg"
                  className="forecastIcon"
                  alt=""
                />
                <small>28º</small>
              </div>
              <div className="col-2">
                <small>Wed</small>
                <img
                  src="https://www.accuweather.com/images/weathericons/3.svg"
                  className="forecastIcon"
                  alt=""
                />
                <small>24º</small>
              </div>
              <div className="col-2">
                <small>Thu</small>
                <img
                  src="https://www.accuweather.com/images/weathericons/3.svg"
                  className="forecastIcon"
                  alt=""
                />
                <small>26º</small>
              </div>
              <div className="col-2">
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
        </div>
      </div>
    );
  } else {
    getCityData();
    return "Loading...";
  }
}
