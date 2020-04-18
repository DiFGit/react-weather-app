import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./WeatherApp.css";
import CityImage from "./CityImage";
import MainData from "./MainData";
import Forecast from "./Forecast";
import Loader from "react-loader-spinner";

export default function WeatherApp(props) {
  let [city, setCity] = useState(props.defaultCity);
  let [input, setInput] = useState("null");
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [units, setUnits] = useState("metric");
  let [celsius, setCelsius] = useState("active btn btn - lg units celsius");
  let [fahrenheit, setFahrenheit] = useState(
    "inactive btn btn-lg units fahrenheit"
  );
  const [currentLocation, setCurrentLocation] = useState(false);

  /*   function handleMainError() {
    alert("We are trying to find it...");
  } */

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
      time: response.data.dt * 1000 + response.data.timezone * 1000,
      ready: true,
    });
  }

  useEffect(
    function getCityData() {
      const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
      const apiUrl = `https://api.openweathermap.org/data/2.5/`;
      let weatherApiUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(weatherApiUrl).then(handleResponse);
      setCurrentLocation(false);
    },
    [city]
  );

  function getLocalData(position) {
    let currentPosition = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let weatherApiUrl = `${apiUrl}weather?${currentPosition}&appid=${apiKey}&units=metric`;
    axios.get(weatherApiUrl).then(handleResponse);
    setCurrentLocation(true);
    setCity(null);
  }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(getLocalData);
  }

  function updateInput(event) {
    event.preventDefault();
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCity(input);
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
          <CityImage city={city} currentLocation={currentLocation} />{" "}
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
              <MainData city={city} weatherData={weatherData} units={units} />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="forecast">
              <Forecast weatherData={weatherData} units={units} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000}
        className="loader"
      />
    );
  }
}
