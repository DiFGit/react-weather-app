import React, { useState } from "react";
import axios from "axios";
import CityImage from "./CityImage";
import "./Forecast.css";

export default function Forecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);
  let [timezone, setTimezone] = useState(null);

  function formatForecastDay(timestamp) {
    let date = new Date(timestamp);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastWeekDay = days[day + 1];
    if (day === 6) {
      forecastWeekDay = days[0];
    }
    return `${forecastWeekDay}`;
  }

  function getForecastData(response) {
    setForecast(response.data.list);
    setTimezone(response.data.city.timezone);
    setLoaded(true);
  }

  if ((loaded, forecast)) {
    let forecast24h = [7, 15, 23, 31, 39];
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          {forecast24h.map(index => {
            return (
              <div className="col-auto">
                {
                  <span key={index}>
                    <small key={index.dt}>
                      {formatForecastDay(
                        forecast[index].dt * 1000 - timezone * 1000
                      )}
                    </small>
                    <img
                      key={index.icon}
                      src={`http://openweathermap.org/img/wn/${forecast[index].weather[0].icon}@2x.png`}
                      className="forecastIcon"
                      alt=""
                    />
                    <small key={index.temperature}>
                      {Math.round(forecast[index].main.temp)}º
                    </small>
                  </span>
                }
              </div>
            );
          })}
        </div>
      </footer>
    );
  } else {
    const apiKey = "1c79a9c19394dbdbf78cd6d4344cc928";
    const apiUrl = `https://api.openweathermap.org/data/2.5/`;
    let apiForecastUrl = `${apiUrl}forecast?q=${props.city}&appid=${apiKey}&units=metric`;
    axios
      .get(apiForecastUrl)
      .then(getForecastData)
      .catch(
        <CityImage
          image={
            "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        />
      );
    return <div>"Loading..."</div>;
  }
}
