import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './WeatherCard.js';
import axios from 'axios';

const config = require('./config.js')
const API_KEY = config.API_KEY;



function App() {

  const [location, setLocation] = useState("");
  const [degrees, setDegrees] = useState("");
  const [locationExists, setLocationExists] = useState(undefined);
  const [existingLocation, setExistingLocation] = useState("");
  const [isDayTime, setIsDayTime] = useState(null);
  const [weatherConditions, setweatherConditions] = useState("");
  const [icon, setIcon] = useState("");

  const iconList = {
    Clear: ["wi wi-owm-day-800", "wi wi-owm-night-800"],
    Rain: ["wi wi-owm-day-501", "wi wi-owm-night-501"],
    Clouds: ["wi wi-owm-804", "wi wi-owm-804"],
    Thunderstorm: ["wi wi-owm-day-531", "wi wi-owm-night-531"],
    Other: ["wi wi-owm-day-741", "wi wi-owm-night-741"]

  }


  let iconName = "";

  function handleChange(e){

    e.preventDefault();
    setLocation(e.target.value);

  }

  function onClick(e){

    e.preventDefault();
    console.log(location)

    axios(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`)
      .then(res => {

        let data = res.data;

        //calculate if day or night
        let time = Date.now()
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;
        let isDayOrNight = (time > sunset && time < sunrise) ? 1 : 0;

        //get weather conditions
        let conditions = data.weather[0].main;

        //set Icon
        switch(conditions){
          case "Rain":
            setIcon(iconList.Rain[isDayOrNight]);
            break;
          case "Clouds":
            setIcon(iconList.Clouds[isDayOrNight]);
            break;
          case "Clear":
            setIcon(iconList.Clear[isDayOrNight]);
            break;
          case "Thunderstorm":
            setIcon(iconList.Thunderstorm[isDayOrNight])
            break;
          default:
            setIcon(iconList.Other[isDayOrNight]);
        }
        //set state vars
        setExistingLocation(location);
        setLocationExists(true)
        setDegrees(Math.floor(data.main.temp));

      }).catch(err => {
        console.log("invalid location")
        setLocationExists(false);
      })

  }



  return (

    <div className="app__container">

        <form>
          <input onChange={handleChange} id="locationText" className="location_input" type="text" placeholder="city, zipcode, town"></input>
          <button onClick={onClick}>Enter</button>
        </form>

        {
          locationExists ? <Card weatherConditions={icon} day={existingLocation} degrees={degrees}/> : null
        }


    </div>
  );
}

export default App;
