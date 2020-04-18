import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CityImage.css";

export default function CityImage(props) {
  let [imageUrl, setImageUrl] = useState(null);

  function handleErrors() {
    setImageUrl(
      "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    );
  }

  function displayCityImage(response) {
    setImageUrl(response.data.photos[3].src.portrait);
  }

  useEffect(
    function getCityImage() {
      axios({
        method: "get",
        url: `https://api.pexels.com/v1/search?query=${props.city}+query&per_page=15&page=1`,
        headers: {
          Authorization:
            "563492ad6f91700001000001f466afaf7aa641ac972d98d7545e9bfa",
        },
      })
        .then(displayCityImage)
        .catch(handleErrors);
    },
    [props.city]
  );

  if (props.currentLocation) {
    return (
      <img
        alt=""
        src="https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        className="city-image card border-light"
      />
    );
  } else {
    return (
      <img alt="" src={imageUrl} className="city-image card border-light" />
    );
  }
}
