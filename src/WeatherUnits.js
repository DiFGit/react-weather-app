import React, { useState } from "react";
import "./WeatherUnits.css";

export default function WeatherUnits(props) {
  let [temperature, setTemperature] = useState(props.temperature);
  let [conversion, setConversion] = useState(false);
  function displayImperial(event) {
    event.preventDefault();
    setTemperature((props.temperature * 9) / 5 + 32);
    setConversion(true);
  }

  function displayMetrics(event) {
    event.preventDefault();
    setTemperature(props.temperature);
  }

  if (conversion.true) {
    return (
      <div className="units-links">
        <h5>{temperature}</h5>
        <a
          href="/"
          onClick={displayMetrics}
          className="inactive btn btn-lg units celsius"
        >
          C{" "}
        </a>
        |
        <a
          href="/"
          onClick={displayImperial}
          className="active btn btn-lg units fahrenheit"
        >
          F{" "}
        </a>
      </div>
    );
  } else {
    return (
      <div className="units-links">
        <h5>{temperature}</h5>
        <a
          href="/"
          onClick={displayMetrics}
          className="active btn btn-lg units celsius"
        >
          C{" "}
        </a>
        |
        <a
          href="/"
          onClick={displayImperial}
          className="inactive btn btn-lg units fahrenheit"
        >
          F{" "}
        </a>
      </div>
    );
  }
}
