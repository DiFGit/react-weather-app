import React from "react";
import "./MainData.css";
import DisplayTime from "./DisplayTime";

export default function MainData(props) {
  let data = props.weatherData;

  if (props.units === "imperial") {
    let temperature = Math.round((data.temperature * 9) / 5 + 32);
    let tempMax = Math.round((data.tempMax * 9) / 5 + 32);
    let tempMin = Math.round((data.tempMin * 9) / 5 + 32);
    let windSpeed = Math.round(data.windSpeed * 2.236936).toFixed(1);

    return (
      <div className="row form-group clearfix">
        <div className="form-inline weatherMain">
          <div className="col-4 leftData">
            <h4 className="leftData location">{data.city}</h4>
            <div className="leftData day-hour">
              <DisplayTime time={data.time} />
            </div>
            <div className="leftData weather-description">
              {data.description}
            </div>
            <div className="leftData temp-max-min">
              {tempMax}º/{tempMin}º
            </div>
          </div>
          <div className="col-4 float:left current-weather">
            <img src={data.iconUrl} className="weather-icon" alt="" />
            <div className="current-temperature">
              <strong>
                <span className="current-temperature-element">
                  {temperature}º
                </span>
              </strong>
            </div>
          </div>
          <ul className="col-4 weatherDetails">
            <br />
            <br />
            <li>
              Pressure: <span className="pressure" />
              {data.pressure}mb
            </li>
            <li>
              Humidity: <span className="humidity" />
              {data.humidity}%
            </li>
            <li>
              Wind: <span className="wind-speed" /> {windSpeed}
              <span className="wind-units" />
              mph
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
            <h4 className="leftData location">{data.city}</h4>
            <div className="leftData day-hour">
              <DisplayTime time={data.time} />
            </div>
            <div className="leftData weather-description">
              {data.description}
            </div>
            <div className="leftData temp-max-min">
              {data.tempMax}º/{data.tempMin}º
            </div>
          </div>
          <div className="col-4 float:left current-weather">
            <img src={data.iconUrl} className="weather-icon" alt="" />
            <div className="current-temperature">
              <strong>
                <span className="current-temperature-element" />
                {data.temperature}º
              </strong>
            </div>
          </div>
          <ul className="col-4 weatherDetails">
            <br />
            <br />
            <li>
              Pressure: <span className="pressure" />
              {data.pressure}mb
            </li>
            <li>
              Humidity: <span className="humidity" />
              {data.humidity}%
            </li>
            <li>
              Wind: <span className="wind-speed" /> {data.windSpeed}
              <span className="wind-units" />
              m/s
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
