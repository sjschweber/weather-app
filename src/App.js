import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './WeatherCard.js';
import axios from 'axios';

const API_KEY = "NAQgnnEuhIjNziOdkNHGv4ZWBxrdUSqn";

function App() {

  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [locationExists, setLocationExists] = useState(undefined);
  const [existingLocation, setExistingLocation] = useState("");


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
        axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${res}?apikey=${API_KEY}`)
          .then(data =>{
            console.log(data);
            setLocationExists(true);
            setExistingLocation(location);
            setWeather(data.data.DailyForecasts[0].Temperature.Maximum.Value);
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
          locationExists ? <Card day={existingLocation} degrees={weather}/> : null
        }


    </div>
  );
}

export default App;
