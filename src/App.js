import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './WeatherCard.js';

function App() {

  var days = [
    {
      day: "Monday",
      degrees: 70
    },
    {
      day: "Tuesday",
      degrees: 55,
    },
    {
      day: "Wednesday",
      degrees: 77,
    },
    {
      day: "Thursday",
      degrees: 73
    },
    {
      day: "Friday",
      degrees: 74
    },
    {
      day: "Saturday",
      degrees: 80
    },
    {
      day: "Sunday",
      degrees: 81
    }
  ]

  return (
    <div className="app__container">
        <form>
          <input className="location_input" type="text" placeholder="city, zipcode, town"></input>
          <button>Enter</button>
        </form>


        {days.map((item) => {
          return(
            <Card day={item.day} degrees={item.degrees} />
          )
        })}

    </div>
  );
}

export default App;
