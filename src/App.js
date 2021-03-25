import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './WeatherCard.js';
import axios from 'axios';

const config = require('./config.js')
const API_KEY = config.API_KEY;



function App() {

  const [location, setLocation] = useState("");
  const [locationExists, setLocationExists] = useState(undefined);
  const [locationArray, setLocationArray] = useState([]);
  const [seenLocations, setSeenLocations] = useState([]);

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

  function capitalizeFirstChar(str){
    let retStr = str.charAt(0).toUpperCase() + str.slice(1);
    return retStr;
  }

  function onClick(e){

    e.preventDefault();

    axios(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`)
      .then(res => {

        let data = res.data;

        //calculate if day or night
        let time = Date.now()
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;
        let isDayOrNight = (time > sunset && time < sunrise) ? 1 : 0;

        let icon = ""

        //get weather conditions
        let conditions = data.weather[0].main;

        //set Icon
        switch(conditions){
          case "Rain":
            icon = iconList.Rain[isDayOrNight];
            break;
          case "Clouds":
            icon = iconList.Clouds[isDayOrNight];
            break;
          case "Clear":
            icon = iconList.Clear[isDayOrNight];
            break;
          case "Thunderstorm":
            icon = iconList.Thunderstorm[isDayOrNight]
            break;
          default:
            icon = iconList.Other[isDayOrNight];
        }
        //set state vars
        setSeenLocations([...seenLocations, location.toLowerCase()]);
        setLocationExists(true)

        if(!seenLocations.includes(location.toLocaleLowerCase())){
          setLocationArray([...locationArray, {
            existing_location: capitalizeFirstChar(location),
            degrees: Math.floor(data.main.temp),
            isDay: isDayOrNight,
            weatherConditions: conditions,
            icon: icon,
          }])
        }



      }).catch(err => {
        console.log("invalid location")
        setLocationExists(false);
      })

  }

  console.log(locationArray)


  return (

    <div className="app__container">

        <form>
          <input onChange={handleChange} id="locationText" className="location_input" type="text" placeholder="city, zipcode, town"></input>
          <button onClick={onClick}>Enter</button>
        </form>

        <div className="list__of__locations">

        {
          locationArray.map((item) => {

            return (<Card weatherConditions={item.icon} day={item.existing_location} degrees={item.degrees}/>)
            
          })
        }

        </div>



    </div>
  );
}

export default App;
