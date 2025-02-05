const API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';

// First, get the latitude and longitude for the city
const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?${city}&limit=1&appid=${API_KEY}`;

let lat = 51.5073219;
let lon = -0.1276474;

// Call getWeather API when the button is clicked
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

// Fetching data from api

fetch(weatherUrl)
  .then((response) => response.json())

  .then((data) => {
    console.log(data);
    console.log(data.name, data.main.temp, data.weather[0].description); // Access specific weather data
  })

  .catch((error) => console.error('Error fetching weather:', error));

// Function to display data in HTML file
function displayData(data) {
  const container = document.getElementById('weatherResult');
  container.innerHTML = '';
}
