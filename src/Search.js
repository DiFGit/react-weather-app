import React, { useState } from "react";
import axios from "axios";
import MainData from "./MainData";

export default function WeatherApp(props) {
  let [city, setCity] = useState(props.defaultCity);
  let [loaded, setLoaded] = useState(false);

  function getCityData() {
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let weatherApiUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(weatherApiUrl).then(setLoaded(loaded));
  }

  function updateInput(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getCityData();
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
        <MainData city={city} loaded={loaded} />
      </div>
    </div>
  );
}
