import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
import CityImage from "./CityImage";
import MainData from "./MainData";
import Forecast from "./Forecast";

export default function WeatherApp(props) {
  let [city, setCity] = useState(props.defaultCity);
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [forecastData, setForecastData] = useState({ ready: false });
  let [fixedTime, setFixedTime] = useState(null);
  let [units, setUnits] = useState("metric");
  let [celsius, setCelsius] = useState("active btn btn - lg units celsius");
  let [fahrenheit, setFahrenheit] = useState(
    "inactive btn btn-lg units fahrenheit"
  );
  let [imageUrl, setImageUrl] = useState(null);

  function displayCityImage(response) {
    setImageUrl(response.data.photos[3].src.portrait);
  }

  function getCityImage() {
    axios({
      method: "get",
      url: `https://api.pexels.com/v1/search?query=${city}+query&per_page=15&page=1`,
      headers: {
        Authorization:
          "563492ad6f91700001000001ea246cab4f4645409f66c0be39fbe2b1"
      }
    }).then(displayCityImage);
  }

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
    getCityImage();
  }

  function displayImperial(event) {
    event.preventDefault();
    setUnits("imperial");
    setFahrenheit("active btn btn - lg units celsius");
    setCelsius("inactive btn btn-lg units fahrenheit");
  }

  function displayMetrics(event) {
    event.preventDefault();
    setUnits("metric");
    setFahrenheit("inactive btn btn - lg units celsius");
    setCelsius("active btn btn-lg units fahrenheit");
  }

  if (weatherData.ready) {
    return (
      <div className="weatherData container">
        <div className="card bg-dark text-white">
          <CityImage city={city} image={imageUrl} />{" "}
          <div className="card-img-overlay">
            <div className="row clearfix">
              <div className="form-group">
                <form
                  className="form-inline searchForm"
                  onSubmit={handleSubmit}
                >
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
                    <a href="/" onClick={displayMetrics} className={celsius}>
                      C{" "}
                    </a>
                    |
                    <a
                      href="/"
                      onClick={displayImperial}
                      className={fahrenheit}
                    >
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
                fixedTime={fixedTime}
                units={units}
              />
            </div>
            <div className="forecast">
              <small className="forecastDescription">
                Around this time, on
              </small>
              <Forecast
                forecastData={forecastData}
                forecastDay={forecastDay}
                units={units}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    getCityData();
    getCityImage();
    return "Loading...";
  }
}
