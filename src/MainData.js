import React from "react";
import "./MainData.css";

export default function MainData(props) {
  if (props.units === "imperial") {
    let temperature = Math.round((props.weatherData.temperature * 9) / 5 + 32);
    let tempMax = Math.round((props.weatherData.tempMax * 9) / 5 + 32);
    let tempMin = Math.round((props.weatherData.tempMin * 9) / 5 + 32);

    return (
      <div className="row form-group clearfix">
        <div className="form-inline weatherMain">
          <div className="col-4 leftData">
            <h4 className="leftData location">{props.weatherData.city}</h4>
            <div className="leftData day-hour">{props.fixedTime}</div>
            <div className="leftData weather-description">
              {props.weatherData.description}
            </div>
            <div className="leftData temp-max-min">
              {tempMax}º/{tempMin}º
            </div>
          </div>
          <div className="col-4 float:left current-weather">
            <img
              src={props.weatherData.iconUrl}
              className="weather-icon"
              alt=""
            />
            <div className="current-temperature">
              <strong>
                <span className="current-temperature-element" />
                {temperature}º
              </strong>
            </div>
          </div>
          <ul className="col-4 weatherDetails">
            <br />
            <br />
            <li>
              Pressure: <span className="pressure" />
              {props.weatherData.pressure}mb
            </li>
            <li>
              Humidity: <span className="humidity" />
              {props.weatherData.humidity}%
            </li>
            <li>
              Wind: <span className="wind-speed" />{" "}
              {props.weatherData.windSpeed}
              <span className="wind-units" />
              m/s
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row form-group clearfix">
        <div className="form-inline weatherMain">
          <div className="col-4 leftData">
            <h4 className="leftData location">{props.weatherData.city}</h4>
            <div className="leftData day-hour">{props.fixedTime}</div>
            <div className="leftData weather-description">
              {props.weatherData.description}
            </div>
            <div className="leftData temp-max-min">
              {props.weatherData.tempMax}º/{props.weatherData.tempMin}º
            </div>
          </div>
          <div className="col-4 float:left current-weather">
            <img
              src={props.weatherData.iconUrl}
              className="weather-icon"
              alt=""
            />
            <div className="current-temperature">
              <strong>
                <span className="current-temperature-element" />
                {props.weatherData.temperature}º
              </strong>
            </div>
          </div>
          <ul className="col-4 weatherDetails">
            <br />
            <br />
            <li>
              Pressure: <span className="pressure" />
              {props.weatherData.pressure}mb
            </li>
            <li>
              Humidity: <span className="humidity" />
              {props.weatherData.humidity}%
            </li>
            <li>
              Wind: <span className="wind-speed" />{" "}
              {props.weatherData.windSpeed}
              <span className="wind-units" />
              m/s
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
