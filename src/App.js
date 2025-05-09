import React, { useState } from "react";
import "./App.css";
import { WiDaySunny } from "react-icons/wi";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "your_api_key"; // 🔑 Replace this with your OpenWeatherMap API key

  const getWeather = async (cityName = city) => {
    if (!cityName) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found");
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError("");
      }
    } catch (err) {
      setError("Error fetching data");
      setWeatherData(null);
    }
  };

  const handleSuggestedClick = (suggestedCity) => {
    setCity(suggestedCity);
    getWeather(suggestedCity); // Fetch weather when clicked
  };

  const handleSearch = () => {
    getWeather();
  };

  return (
    <div className="app">
      <h1 className="title">Weather Forecast App</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="recommended">
        <p>Try one of these:</p>
        {["Tokyo", "London", "Kathmandu", "Paris", "New York"].map((c) => (
          <button key={c} onClick={() => handleSuggestedClick(c)}>
            {c}
          </button>
        ))}
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <WiDaySunny className="icon" />
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <h3>{weatherData.main.temp}°C</h3>
          <div className="details">
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} m/s</p>
            <p>Feels like: {weatherData.main.feels_like}°C</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
