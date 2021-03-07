import React, {useState} from 'react';
import sunImage from './media/sunny.png';
import './Card.css';

export default function Card(props){

  return(

    <div className="card">

      <div className="card__header">
        {props.day}
      </div>

      <div className="card__img">
        <img src={sunImage}></img>
      </div>

      <div className="card__text">
        {props.degrees}
      </div>

    </div>
  )


}
