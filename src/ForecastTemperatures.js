import React from "react";

export default function ForecastTemperatures(props) {
  let forecast = props.data.list;
  let day1 = forecast.slice(0, 7);
  let tempMaxDay1 = day1.map(day1 => day1.main.temp_max);
  let tempMinDay1 = day1.map(day1 => day1.main.temp_min);
  return (
    <span>
      {Math.round(Math.max(...tempMaxDay1))}º /{" "}
      {Math.round(Math.min(...tempMinDay1))}º
    </span>
  );
}
