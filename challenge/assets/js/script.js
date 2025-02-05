const API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';

//Function to fetch weather data based on city input
function getWeather() {
  const city = document.getElementById('city').value.trim();

  // If no city name is entered then an alert will popup
  if (!city) {
    alert('Please enter city name');
    return;
  }

  // Getting the longitude and latitude of the city location
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  // Fetching data from api
  fetch(geoUrl)
    .then((response) => response.json())
    .then((geoData) => {
      if (geoData.length === 0) {
        throw new Error('City not found');
      }
      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      return fetch(weatherUrl);
    })
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.name;
      const cityTemp = data.main.temp;
      const cityDescription = data.weather[0].description;

      displayData(cityName, cityTemp, cityDescription);
    })

    .catch((error) => console.error('Error fetching weather:', error));
  displayError('Failed to get weather info. Try again');
}

// Function to display data in HTML on screen
function displayData(cityName, cityTemp, cityDescription) {
  const container = document.getElementById('weatherResult');

  container.innerHTML = '';

  const dataElement = document.createElement('div');
  dataElement.classList.add('weather-info');

  dataElement.innerHTML = `
      <p>City: ${cityName}</p>
      <p>Temperature: ${Math.round(cityTemp)}°C</p>
      <p>Description: ${cityDescription}</p>
    `;

  container.appendChild(dataElement);
}

//function to display error message if api call isn't working for whatever reason or typed city is invalid
function displayError(message) {
  const container = document.getElementById('weatherResult');

  container.innerHTML = '';

  const errorElement = document.createElement('div');
  errorElement.classList.add('error-message');
  errorElement.textContent = message;

  container.appendChild(errorElement);
}

// when button is clicked getWeather function is run and information is passed
document.getElementById('getWeather').addEventListener('click', getWeather);
