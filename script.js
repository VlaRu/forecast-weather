import { getTime } from "./modules/getTime.js";
import { displayForecast, displayCurrentWeather } from "./modules/displayForecast.js";

const KEY = 'e186479a64f57dec494e256f54b201aa'
const URL = 'https://api.openweathermap.org/data/2.5';
const btn = document.querySelector(".search-button");
const inp = document.querySelector(".type-city");
const local =document.querySelector(".local-data")
//let icon = document.querySelectorAll(".icon-day-weather");
//const dayWeather = document.querySelectorAll(".day-weather");
//const time = document.querySelector("#time")

function getWeatherByCity(city) {
  const currentWeatherUrl = `${URL}/weather?q=${city}&appid=${KEY}&units=metric`;
  const forecastUrl = `${URL}/forecast?q=${city}&appid=${KEY}&units=metric`;

  axios.get(currentWeatherUrl)
    .then(response => {
      displayCurrentWeather(response.data);
      return axios.get(forecastUrl);
    })
    .then(response => {
      displayForecast(response.data.list);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `${URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`;
  axios.get(url).then(getWeatherByCityByCoords)
}

function getWeatherByCityByCoords(response) {
  displayCurrentWeather(response.data)

  const localForecastUrl = `${URL}/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${KEY}&units=metric`;

  axios.get(localForecastUrl)
    .then(response => {
      displayForecast(response.data.list);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

window.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition(retrievePosition);
});

btn.addEventListener('click', (e) => {
  e.preventDefault();
  let inputCity = inp.value;
  getWeatherByCity(inputCity)
});

local.onclick =()=>{
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

setInterval(getTime, 1000);
getTime()