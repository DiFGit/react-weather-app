import React from "react";
import WeatherApp from "./WeatherApp";

import "./App.css";

export default function App() {
  return (
    <div className="App container">
      <div className="card bg-dark text-white">
        <img
          src="https://images.pexels.com/photos/1559908/pexels-photo-1559908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          className="card-img background-image"
          alt=""
        />
        <div className="card-img-overlay">
          <WeatherApp defaultCity="Lisbon" />
        </div>
      </div>
      <div className="Footer">
        <small className="pexels-link">
          Photos provided by
          <a
            href="https://www.pexels.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
        </small>
        <small className="github-link">
          <a
            href="https://github.com/DiFGit/react-weather-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-source code
          </a>
          , by DiFGit
        </small>
      </div>
    </div>
  );
}
