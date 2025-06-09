import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./index.css";

// It's best practice to store API keys in environment variables
const API_KEY = "df78ef748fb90486c540c323244aa5e8";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    // Prevent form submission if this were a form
    if (e) e.preventDefault();

    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setError("");
    setWeather(null); // Clear previous results immediately

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok && data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message || "City not found!");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please check your connection.");
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form className="search" onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{capitalizeDescription(error)}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

// Small helper for error message capitalization
const capitalizeDescription = (s) => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default App;