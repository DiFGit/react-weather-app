import React from "react";
import "./Forecast.css";

export default function Forecast(props) {
  let data = props.forecastData;

  if (props.units === "imperial") {
    let temperature = Math.round((data.temperature * 9) / 5 + 32);
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          <div className="col-auto">mon </div>
          <div className="col-auto">
            <small>{props.forecastDay}</small>
            <img src={data.forecastIconUrl} className="forecastIcon" alt="" />
            <small>{temperature}</small>
          </div>
          <div className="col-auto">
            <small>Tue</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>28º</small>
          </div>
          <div className="col-auto">
            <small>Wed</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>24º</small>
          </div>
          <div className="col-auto">
            <small>Thu</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>26º</small>
          </div>
          <div className="col-auto">
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
    );
  } else {
    return (
      <footer className="forecastBox">
        <div className="row justify-content-center forecast">
          <div className="col-auto">
            <small>{props.forecastDay}</small>
            <img src={data.forecastIconUrl} className="forecastIcon" alt="" />
            <small>{data.temperature}</small>
          </div>
          <div className="col-auto">
            <small>Tue</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>28º</small>
          </div>
          <div className="col-auto">
            <small>Wed</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>24º</small>
          </div>
          <div className="col-auto">
            <small>Thu</small>
            <img
              src="https://www.accuweather.com/images/weathericons/3.svg"
              className="forecastIcon"
              alt=""
            />
            <small>26º</small>
          </div>
          <div className="col-auto">
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
    );
  }
}
