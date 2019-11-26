import React, { useState } from "react";

export default function Forecast(props) {
  return (
    <footer className="forecastBox">
      <div className="row justify-content-center forecast">
        <div className="col-2">
          <small>{props.forecastDay}</small>
          <img
            src={props.forecastData.forecastIconUrl}
            className="forecastIcon"
            alt=""
          />
          <small>{props.forecastData.temperature}</small>
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
  );
}
