import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './WeatherCard.js';
import axios from 'axios';

const API_KEY = "NAQgnnEuhIjNziOdkNHGv4ZWBxrdUSqn";

function App() {

  const [location, setLocation] = useState("");

  const x = "Toronto";

  useEffect(() => {

    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${location}`)
      .then(res => {
         console.log(res.data[0].Key);
         return res.data[0].Key
      })
      .then(res =>{

        axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${res}?apikey=${API_KEY}`)
          .then(data =>{
            console.log(data);
            return data;
          })
      }

      )

  })

  function onClick(e){
    e.preventDefault();
    setLocation(document.getElementById("locationText").value);
    console.log(location);
  }

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
