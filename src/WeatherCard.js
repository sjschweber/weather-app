import React, {useState} from 'react';
import sunImage from './media/sunny.png';
import './Card.css';
import './css/weather-icons.css';

export default function Card(props){

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
        <i className="wi wi-fahrenheit degree"></i>
      </div>
    </div>
  )


}
