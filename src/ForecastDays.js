import React from "react";
import ForecastDisplay from "./ForecastDisplay";

export default function ForecastDays(props) {
  let forecast = props.data;

  let date = new Date(
    props.data.list[0].dt * 1000 - props.data.city.timezone * 1000
  );
  let hour = date.getHours();

  if (hour === 21) {
    let day1 = forecast.list.slice(1, 8);
    let day2 = forecast.list.slice(9, 16);
    let day3 = forecast.list.slice(17, 24);
    let day4 = forecast.list.slice(25, 32);
    let fourDayForecast = [day1, day2, day3, day4];
    return (
      <ForecastDisplay
        fourDayForecast={fourDayForecast}
        data={forecast}
        units={props.units}
      />
    );
  }
  if (hour === 0) {
    let day1 = forecast.list.slice(8, 15);
    let day2 = forecast.list.slice(16, 23);
    let day3 = forecast.list.slice(24, 31);
    let day4 = forecast.list.slice(32, 39);
    let fourDayForecast = [day1, day2, day3, day4];
    return (
      <ForecastDisplay
        fourDayForecast={fourDayForecast}
        data={forecast}
        units={props.units}
      />
    );
  }
  if (hour === 3) {
    let day1 = forecast.list.slice(7, 14);
    let day2 = forecast.list.slice(15, 22);
    let day3 = forecast.list.slice(23, 30);
    let day4 = forecast.list.slice(31, 38);
    let fourDayForecast = [day1, day2, day3, day4];
    return (
      <ForecastDisplay
        fourDayForecast={fourDayForecast}
        data={forecast}
        units={props.units}
      />
    );
  }
  if (hour === 6) {
    let day1 = forecast.list.slice(6, 13);
    let day2 = forecast.list.slice(14, 21);
    let day3 = forecast.list.slice(22, 29);
    let day4 = forecast.list.slice(30, 37);
    let fourDayForecast = [day1, day2, day3, day4];
    return (
      <ForecastDisplay
        fourDayForecast={fourDayForecast}
        data={forecast}
        units={props.units}
      />
    );
  }
  if (hour === 9) {
    let day1 = forecast.list.slice(5, 12);
    let day2 = forecast.list.slice(13, 20);
    let day3 = forecast.list.slice(21, 28);
    let day4 = forecast.list.slice(29, 36);
    let fourDayForecast = [day1, day2, day3, day4];
    return (
      <ForecastDisplay
        fourDayForecast={fourDayForecast}
        data={forecast}
        units={props.units}
      />
    );
  }
  if (hour === 12) {
    let day1 = forecast.list.slice(4, 11);
    let day2 = forecast.list.slice(12, 19);
    let day3 = forecast.list.slice(20, 27);
    let day4 = forecast.list.slice(28, 35);
    let fourDayForecast = [day1, day2, day3, day4];
    return (
      <ForecastDisplay
        fourDayForecast={fourDayForecast}
        data={forecast}
        units={props.units}
      />
    );
  }
  if (hour === 15) {
    let day1 = forecast.list.slice(3, 10);
    let day2 = forecast.list.slice(11, 18);
    let day3 = forecast.list.slice(19, 26);
    let day4 = forecast.list.slice(27, 34);
    let fourDayForecast = [day1, day2, day3, day4];
    return (
      <ForecastDisplay
        fourDayForecast={fourDayForecast}
        data={forecast}
        units={props.units}
      />
    );
  }
  if (hour === 18) {
    let day1 = forecast.list.slice(2, 9);
    let day2 = forecast.list.slice(10, 16);
    let day3 = forecast.list.slice(18, 25);
    let day4 = forecast.list.slice(26, 35);
    let fourDayForecast = [day1, day2, day3, day4];
    return (
      <ForecastDisplay
        fourDayForecast={fourDayForecast}
        data={forecast}
        units={props.units}
      />
    );
  }
}
