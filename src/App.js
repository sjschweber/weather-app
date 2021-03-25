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


    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${location}`)
      .then(res => {

        if(res.data.length == 0){
          return undefined;
        }

         return res.data[0].Key
      })
      .then(res =>{

        if(res === undefined){
          setLocationExists(false);
          return undefined;
        }
        axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${res}?apikey=${API_KEY}`)
          .then(data =>{

            console.log(data);
            setLocationExists(true);
            setExistingLocation(location);
            setWeather(data.data[0].Temperature.Imperial.Value);


            switch(data.data[0].WeatherText){
              case "Mostly sunny":
              case "Sunny":
                setweatherConditions("wi wi-day-sunny");
                break;
              case "Partly sunny":
              case "Intermittent clouds":
              case "Hazy sunshine":
              case "Cloudy":
              case "Fog":
              case 'Mostly cloudy':
                setweatherConditions("wi wi-day-cloudy");
                break;
              case "Showers":
              case "Mostly cloudy w/showers":
              case "Partly sunny w/showers":
                setweatherConditions("wi wi-day-showers")
                break;
              case "T-Storms":
              case "Mostly cloudy w/t-storms":
              case "Partly sunny w/t-storms":
                setweatherConditions("wi wi-day-thunderstorm")
                break;
              case "Rain":
                setweatherConditions("wi wi-rain")
                break;
              case "Snow":
                setweatherConditions("wi wi-snow");
                break;
              default:
                setweatherConditions("wi wi-day-sunny");
            }

            if(data.data[0].IsDayTime){
              setIsDayTime(true);
            }else{
              setIsDayTime(false);
            }


            return data;
          }).catch(err => console.log(err))
      }

    ).catch(err => console.log(err));
  }



  return (

    <div className="app__container">

        <form>
          <input onChange={handleChange} id="locationText" className="location_input" type="text" placeholder="city, zipcode, town"></input>
          <button onClick={onClick}>Enter</button>
        </form>

        {
          locationExists ? <Card weatherConditions={weatherConditions} day={existingLocation} degrees={weather}/> : null
        }


    </div>
  );
}

export default App;
