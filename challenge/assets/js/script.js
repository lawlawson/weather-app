const API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';

//Function to fetch weather data based on city input
function getWeather() {
  const city = document.getElementById('city').value.trim();

  // If no city name is entered then an alert will popup
  if (!city) {
    alert('Please enter city name');
    return;
  }

  updateCurrentDateTime();

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
      const icon = data.weather[0].icon;
      const currentDateTime = updateCurrentDateTime();

      displayData(cityName, cityTemp, cityDescription, icon, currentDateTime);
    })

    .catch((error) => console.error('Error fetching weather:', error));
  displayError('Failed to get weather info. Try again');
}

// Function to display data in HTML on screen
function displayData(cityName, cityTemp, cityDescription, icon, currentDateTime) {
  const container = document.getElementById('weatherResult');

  container.innerHTML = '';

  const dataElement = document.createElement('div');
  dataElement.classList.add('weather-info');

  dataElement.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png"/>
      <p> ${cityName}</p>
      <p> ${Math.round(cityTemp)}°C</p>
      <p> ${cityDescription}</p>
      <p>Last Update: ${currentDateTime}</p>
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
// Function to update current date and time
function updateCurrentDateTime() {
  var date = new Date();
  
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
  const year = date.getFullYear();

  // Get the current hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the time with leading zeros if necessary (e.g., 9:05 instead of 9:5)
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Format the current date and time
  let currentDateTime = `${day}/${month}/${year} ${formattedHours}:${formattedMinutes}`;
  
  // Return the formatted current date and time
  return currentDateTime;
}

// Refresh button updates the last update time
document.getElementById("refreshDataBtn").addEventListener("click", function() {
  // Update the last update time when the refresh button is clicked
  const currentDateTime = updateCurrentDateTime();

  // Get the latest weather information for the current city input
  const city = document.getElementById('city').value.trim();
 
  if (!city) {
    alert("Please enter location before hitting refresh button first")
    return;
  }

  getWeather();
  // Optionally, display the updated date-time alone as a last update
  const container = document.getElementById('weatherResult');
  const lastUpdateElement = document.createElement('p');
  lastUpdateElement.textContent = `Last Update: ${currentDateTime}`;
  container.appendChild(lastUpdateElement);

});

// When the Get Weather button is clicked, the getWeather function is called
document.getElementById('getWeather').addEventListener('click', getWeather);