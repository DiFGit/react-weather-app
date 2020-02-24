import React /* , { useState } */ from "react";
import ForecastDisplay from "./ForecastDisplay";
import Loader from "react-loader-spinner";

export default function ForecastDays(props) {
  let forecast = props.forecastData.data;
  let weather = props.weatherData;
  console.log(forecast);
  console.log(weather);

  let date = new Date(
    props.forecastData.date * 1000 + props.forecastData.timezone * 1000
  );
  let hour = date.getHours();
  console.log(date);
  console.log(hour);
  console.log(weather.city);
  console.log(props.forecastData.data.city.name);
  /* let [date, setDate] = useState(null);
  let [hour, setHour] = useState(null);

  function setNewDate() {
    setDate(new Date(props.data.date * 1000 - props.data.timezone * 1000));
    console.log(date);
  }

  function setNewHour() {
    setHour(date.getHours());
    console.log(hour);
  } */

  if (weather.city === props.forecastData.data.city.name) {
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
    if (0 <= hour < 3) {
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
    if (3 <= hour < 6) {
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
    if (6 <= hour < 9) {
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
    if (9 <= hour < 12) {
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
    if (12 <= hour < 15) {
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
    if (15 <= hour < 18) {
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
    if (18 <= hour < 21) {
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

    if (21 <= hour < 24) {
      let day1 = forecast.list.slice(1, 8);
      let day2 = forecast.list.slice(9, 15);
      let day3 = forecast.list.slice(17, 24);
      let day4 = forecast.list.slice(25, 34);
      let fourDayForecast = [day1, day2, day3, day4];
      return (
        <ForecastDisplay
          fourDayForecast={fourDayForecast}
          data={forecast}
          units={props.units}
        />
      );
    }
  } else {
    /*     setNewDate();
    setNewHour(); */
    return (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000} //3 secs
        className="loader"
      />
    );
  }
}
