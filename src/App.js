import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Custom CSS file for styling

const App = () => {
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "f2c71364000fdb4da086761832553a97";  // Your OpenWeatherMap API Key

  // Fetch weather data based on city
  const fetchWeather = async () => {
    if (city.trim() === "") return;

    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      setError("City not found, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="weather-container">
        <h1>Weather App</h1>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {/* Loading */}
        {loading && <p>Loading...</p>}

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Weather Data */}
        {weather && !loading && !error && (
          <div className="weather-details">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
