import React, {useState} from 'react';
import sunImage from './media/sunny.png';
import './Card.css';
import './css/weather-icons.css';

export default function Card(props){

  // let iconName = "";
  // let weatherConditions = props.weatherConditions;
  // console.log(weatherConditions)
  // switch(weatherConditions){
  //   case "Sunny":
  //     iconName = "wi wi-day-sunny"
  //   case 'Cloudy':
  //     iconName = "wi wi-day-cloudy"
  //   default:
  //     iconName = "wi wi-day-sunny";
  // }

  console.log(props.weatherConditions)
  return(

    <div className="card">

      <div className="card__header">
        {props.day}
      </div>

      <div className="card__img">
        <i className={props.weatherConditions}></i>
      </div>


      <div className="card__text">
        {props.degrees}
      </div>

    </div>
  )


}
