import React from "react";
import "./Forecast.css";

export default function ForecastDisplay(props) {
  let forecastDays = props.fourDayForecast;

  function formatForecastDay(timestamp) {
    let date = new Date(timestamp);
    let day = date.getDay();
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let forecastWeekDay = days[day];
    return `${forecastWeekDay}`;
  }

  if (props.units === "imperial") {
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          {forecastDays.map(day => {
            return (
              <div className="col-auto">
                <small>
                  {formatForecastDay(
                    day[0].dt * 1000 - props.data.city.timezone * 1000
                  )}
                </small>
                <img
                  src={`http://openweathermap.org/img/wn/${day[0].weather[0].icon}@2x.png`}
                  className="forecastIcon"
                  alt=""
                />
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
      </footer>
    );
  } else {
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          {forecastDays.map(day => {
            return (
              <div className="col-auto">
                <small>
                  {formatForecastDay(
                    day[0].dt * 1000 - props.data.city.timezone * 1000
                  )}
                </small>
                <img
                  src={`http://openweathermap.org/img/wn/${day[0].weather[0].icon}@2x.png`}
                  className="forecastIcon"
                  alt=""
                />
                <small>
                  {Math.round(Math.max(...day.map(day => day.main.temp_max)))}º
                  / {Math.round(Math.min(...day.map(day => day.main.temp_min)))}
                  º
                </small>
              </div>
            );
          })}
        </div>
      </footer>
    );
  }
}
