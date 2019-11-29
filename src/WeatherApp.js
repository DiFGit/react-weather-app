import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
import MainData from "./MainData";
import Forecast from "./Forecast";
import WeatherUnits from "./WeatherUnits";

export default function WeatherApp(props) {
  let [city, setCity] = useState(props.defaultCity);
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [forecastData, setForecastData] = useState({ ready: false });
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

  function handleResponse(response) {
    setWeatherData({
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
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

  function getCityData() {
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let weatherApiUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(weatherApiUrl).then(handleResponse);
    let apiForecastUrl = `${apiUrl}forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiForecastUrl).then(getForecastData);
  }

  function getLocalData(position) {
    let currentPosition = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let weatherApiUrl = `${apiUrl}weather?${currentPosition}&appid=${apiKey}&units=metric`;
    axios.get(weatherApiUrl).then(handleResponse);
    let apiForecastUrl = `${apiUrl}forecast?q=${currentPosition}&appid=${apiKey}&units=metric`;
    axios.get(apiForecastUrl).then(getForecastData);
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
              <WeatherUnits temperature={weatherData.temperature} />
            </form>
          </div>
        </div>
        <div className="row">
          <MainData
            city={city}
            weatherData={weatherData}
            fixedTime={fixedTime}
          />
        </div>
        <div className="forecast">
          <small className="forecastDescription">Around this time, on</small>
          <Forecast forecastData={forecastData} forecastDay={forecastDay} />
        </div>
      </div>
    );
  } else {
    getCityData();
    return "Loading...";
  }
}
