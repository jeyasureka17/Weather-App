import React from "react";

// Helper function to map weather conditions from the API to emojis
const getWeatherIcon = (condition) => {
  const weatherCondition = condition.toLowerCase();
  switch (weatherCondition) {
    case "clouds":
      return "☁️";
    case "rain":
      return "🌧️";
    case "drizzle":
      return "🌦️";
    case "thunderstorm":
      return "⛈️";
    case "snow":
      return "❄️";
    case "clear":
      return "☀️";
    case "mist":
    case "smoke":
    case "haze":
    case "dust":
    case "fog":
      return "🌫️";
    default:
      return "🌍"; // A default icon for other conditions
  }
};

// Helper to capitalize the first letter of a string
const capitalizeDescription = (s) => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};


function WeatherCard({ weather }) {
  const weatherMain = weather.weather[0].main;
  const weatherDescription = weather.weather[0].description;

  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <div className="weather-icon">{getWeatherIcon(weatherMain)}</div>
      <p style={{fontSize: '1.2rem', textTransform: 'capitalize'}}>{capitalizeDescription(weatherDescription)}</p>
      <h1>{Math.round(weather.main.temp)}°C</h1>
      <div className="details">
        <p>🌡️ Feels like: {Math.round(weather.main.feels_like)}°C</p>
        <p>💧 Humidity: {weather.main.humidity}%</p>
        <p>🌬️ Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;