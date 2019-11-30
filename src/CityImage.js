import React from "react";
import "./CityImage.css";

export default function CityImage(props) {
  return <img src={props.image} className="card-img background-image" alt="" />;
}
