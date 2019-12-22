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
    let forecastWeekDay = days[day];
    return `${forecastWeekDay}`;
  }

  function getForecastData(response) {
    setForecast(response.data);
    setTimezone(response.data.city.timezone);
    setLoaded(true);
  }

  if (
    loaded === true &&
    forecast.city.name === props.city &&
    props.units === "imperial"
  ) {
    let forecast24h = [7, 15, 23, 31, 39];
    let day1 = forecast.list.slice(0, 7);
    let day2 = forecast.list.slice(8, 15);
    let day3 = forecast.list.slice(16, 23);
    let day4 = forecast.list.slice(24, 31);
    let day5 = forecast.list.slice(32, 39);
    let fiveDayForecast = [day1, day2, day3, day4, day5];
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          <div className="row justify-content-center forecast">
            {forecast24h.map(index => {
              return (
                <div className="col-auto">
                  {
                    <span>
                      <small>
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
                    </span>
                  }
                </div>
              );
            })}
          </div>
          <div className="row justify-content-center forecast">
            {fiveDayForecast.map(day => {
              return (
                <div className="col-auto">
                  <small>
                    {Math.round(
                      (Math.max(...day.map(day => day.main.temp_max)) * 9) / 5 +
                        32
                    )}
                    º /{" "}
                    {Math.round(
                      (Math.min(...day.map(day => day.main.temp_min)) * 9) / 5 +
                        32
                    )}
                    º
                  </small>
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    );
  }
  if (
    loaded === true &&
    forecast.city.name === props.city &&
    props.units === "metric"
  ) {
    let forecast24h = [7, 15, 23, 31, 39];
    let day1 = forecast.list.slice(0, 7);
    let day2 = forecast.list.slice(8, 15);
    let day3 = forecast.list.slice(16, 23);
    let day4 = forecast.list.slice(24, 31);
    let day5 = forecast.list.slice(32, 39);
    let fiveDayForecast = [day1, day2, day3, day4, day5];
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          <div className="row justify-content-center forecast">
            {forecast24h.map(index => {
              return (
                <div className="col-auto">
                  {
                    <span>
                      <small>
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
                    </span>
                  }
                </div>
              );
            })}
          </div>
          <div className="row justify-content-center forecast">
            {fiveDayForecast.map(day => {
              return (
                <div className="col-auto">
                  <small>
                    {Math.round(Math.max(...day.map(day => day.main.temp_max)))}
                    º /{" "}
                    {Math.round(Math.min(...day.map(day => day.main.temp_min)))}
                    º
                  </small>
                </div>
              );
            })}
          </div>
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
