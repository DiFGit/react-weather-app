import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
import MainData from "./MainData";

export default function SearchForm() {
  let [city, setCity] = useState();
  let [temperature, setTemperature] = useState(null);
  let [loaded, setLoaded] = useState(false);

  function displayTemperature(response) {
    setTemperature(response.data.main.temp);
  }

  function updateInput(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoaded(true);
    let apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    let apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let weatherApiUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(weatherApiUrl).then(displayTemperature);
  }

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
              <button className="col-2 btn btn-sm mr-5 current-location">
                <i className="fas fa-map-marker-alt local-icon " />
              </button>
            </div>
            <div className="units-links">
              <a href="/" className="active btn btn-lg celsius">
                C{" "}
              </a>
              |
              <a href="/" className="inactive btn btn-lg fahrenheit">
                F{" "}
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        {/*         <WeatherData city={city} loaded={loaded} /> */}
        <MainData
          city={city}
          loaded={loaded}
          temperature={Math.round(temperature)}
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
}
