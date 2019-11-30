import React, { useState } from "react";
import "./WeatherUnits.css";

export default function WeatherUnits(props) {
  let [temperature, setTemperature] = useState(props.temperature);
  let [conversion, setConversion] = useState(false);
  let [celsius, setCelsius] = useState("active btn btn - lg units celsius");
  let [fahrenheit, setFahrenheit] = useState(
    "inactive btn btn-lg units fahrenheit"
  );
  function displayImperial(event) {
    event.preventDefault();
    setTemperature((props.temperature * 9) / 5 + 32);
    setConversion(true);
    setFahrenheit("active btn btn - lg units celsius");
    setCelsius("inactive btn btn-lg units fahrenheit");
  }

  function displayMetrics(event) {
    event.preventDefault();
    setTemperature(props.temperature);
    setFahrenheit("inactive btn btn - lg units celsius");
    setCelsius("active btn btn-lg units fahrenheit");
  }

  if (conversion.true) {
    return (
      <div className="units-links">
        <h5>{temperature}</h5>
        <a href="/" onClick={displayMetrics} className={celsius}>
          C{" "}
        </a>
        |
        <a href="/" onClick={displayImperial} className={fahrenheit}>
          F{" "}
        </a>
      </div>
    );
  } else {
    return (
      <div className="units-links">
        <h5>{temperature}</h5>
        <a href="/" onClick={displayMetrics} className={celsius}>
          C{" "}
        </a>
        |
        <a href="/" onClick={displayImperial} className={fahrenheit}>
          F{" "}
        </a>
      </div>
    );
  }
}
