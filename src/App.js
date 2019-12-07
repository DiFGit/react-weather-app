import React from "react";
import WeatherApp from "./WeatherApp";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <WeatherApp defaultCity="Lisbon" />

      <div className="Footer links">
        <small className="github-link">
          <a
            href="https://github.com/DiFGit/react-weather-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-source code{" "}
          </a>
          by Diana Ferreira
        </small>
        <small className="pexels-link">
          Photos provided by{" "}
          <a
            href="https://www.pexels.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
        </small>
      </div>
    </div>
  );
}
