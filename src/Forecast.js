/* import React, { useState } from "react";
import axios from "axios";
import ForecastDays from "./ForecastDays";
import CityImage from "./CityImage";
import "./Forecast.css";

export default function Forecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);
  let units = props.units;
  console.log(props.city);
  console.log(loaded);

  function getForecastData(response) {
    setForecast(response.data);
  }

  if (props.ready && loaded && forecast.city.name === props.city) {
    return <ForecastDays data={forecast} units={units} loaded={true} />;
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
 */
