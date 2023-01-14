
import React, { Component }  from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

/**Weather app functionality 
 * 1. Grab data from database by using an API (Application Programming Interface) - JSON weather data
 * 2. State JS object! - holds the current state of information. Dynamic data like form that changes
 * 3. Using hooks to handle weather data state 
 **/

function App() {


  const[search, setSearch] = useState('');

  const[allData, setAllData] = useState({
    city: '',
    country: '',
    temperature: '',
    humidity: '',
    min_temp: '',
    weather_icon: '',
    weather_description: ''
  });

  useEffect(() => {
    //add what we want to happen after rendering
    fetchData()
  },[]); // [] so it doesn't get called over and over again

  const fetchData = async (city) => {
    try {
      const API_KEY = "b86c59453e5114297db338b4bc70267c";
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
     
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        min_temp: result.data.main.temp_min,
        weather_icon: result.data.weather[0].icon,
        weather_description: result.data.weather[0].description
      });
      
    } catch (e) {
      console.log("API not loaded correctly or loaded for the first time")      
    }
  
  };

  const handleSubmit = (event) => {
    console.log(search);
    event.preventDefault();
    fetchData(search); //connecting api call with search 

  }

  const handleChange = (event) =>{
    setSearch(event.target.value);
  }

  //rendering 
  return (
    //main - sections for the form and displaying results 
    <main>
    <div className="form">

      <form onSubmit={handleSubmit}>
        <input 
          value = {search}
          type="text"
          name="city"
          placeholder="City Name"
          onChange={handleChange}
        />

        <button htmlFor="city">Search</button>

      </form>

      <section>
      <div className="header-div">

        <div>
          <div className = "data">
  
          <img src={"http://openweathermap.org/img/wn/" + allData.weather_icon + "@2x.png"} alt=""/>
          <h1 className = "title"> {allData.city}</h1>
          <h2 className = "location"> {allData.country}</h2>

        
            <div className='weather-description'>
          <div>
            <h3>TEMPERATURE</h3>
            <p>{allData.temperature}°C</p>
          </div>

          <div>
            <h3>HUMIDITY</h3>
            <p>{allData.humidity}%</p>
          </div>

          <div>
            <h3>MINIMUM TEMPERATURE</h3>
            <p>{allData.min_temp}°C</p>
          </div>

          <div>
            <h3>DESCRIPTION</h3>
            <p className="descript">{allData.weather_description}</p>
          </div>
        </div>
        </div>
        </div>
      </div>
          
      </section>
 
    </div>
    </main>
  );
}

export default App;
