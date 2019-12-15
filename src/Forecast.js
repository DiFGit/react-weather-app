import React, { useState } from "react";
import axios from "axios";
import ForecastTemperatures from "./ForecastTemperatures";
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
    let forecastWeekDay = days[day];
    return `${forecastWeekDay}`;
  }

  function getForecastData(response) {
    setForecast(response.data);
    setTimezone(response.data.city.timezone);
    setLoaded(true);
  }

  if (
    loaded &&
    forecast.city.name === props.city &&
    props.units === "imperial"
  ) {
    let forecast24h = [7, 15, 23, 31, 39];
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          {forecast24h.map(index => {
            return (
              <div className="col-auto">
                {
                  <span>
                    <small key={index.dt}>
                      {formatForecastDay(
                        forecast.list[index].dt * 1000 - timezone * 1000
                      )}
                    </small>
                    <img
                      key={index.icon}
                      src={`http://openweathermap.org/img/wn/${forecast.list[index].weather[0].icon}@2x.png`}
                      className="forecastIcon"
                      alt=""
                    />
                    <small key={index.temp}>
                      {Math.round(
                        (forecast.list[index].main.temp * 9) / 5 + 32
                      )}
                      º
                    </small>
                  </span>
                }
              </div>
            );
          })}
        </div>
      </footer>
    );
  }
  if (loaded && forecast.city.name === props.city && props.units === "metric") {
    let forecast24h = [7, 15, 23, 31, 39];
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          {forecast24h.map(index => {
            return (
              <div className="col-auto">
                {
                  <span>
                    <small key={index.dt}>
                      {formatForecastDay(
                        forecast.list[index].dt * 1000 - timezone * 1000
                      )}
                    </small>
                    <img
                      key={index.icon}
                      src={`http://openweathermap.org/img/wn/${forecast.list[index].weather[0].icon}@2x.png`}
                      className="forecastIcon"
                      alt=""
                    />
                    <small>
                      <ForecastTemperatures data={forecast} />
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
