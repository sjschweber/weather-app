import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './WeatherCard.js';
import axios from 'axios';

const API_KEY = "NAQgnnEuhIjNziOdkNHGv4ZWBxrdUSqn";

function App() {

  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [isLocationRetrieved, setIsLocationRetrieved] = useState(false);
  const [days, setDays] = useState([]);
  const [locationExists, setLocationExists] = useState(undefined);
  const [existingLocation, setExistingLocation] = useState("");




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
            setIsLocationRetrieved(true);
            setWeather(data.data.DailyForecasts[0].Temperature.Maximum.Value);
            return data;
          })
      }

    ).catch(err => err);

  }, [location])

  function onClick(e){
    e.preventDefault();
    setLocation(document.getElementById("locationText").value);
    createDays();
    console.log(days);
  }

  function createDays(){
    let date = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);

    setDays([
      date.toLocaleDateString('en-US', {weekday: 'long'}),
      tomorrow.toLocaleDateString('en-US', {weekday: 'long'})
    ])
    console.log(days);
  }

  return (
    <div className="app__container">
        <form>
          <input id="locationText" className="location_input" type="text" placeholder="city, zipcode, town"></input>
          <button onClick={onClick}>Enter</button>
        </form>

        {
          isLocationRetrieved ? <Card day={location} degrees={weather}/> : null
        }


    </div>
  );
}

export default App;
