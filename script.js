import { getTime } from "./getTime.js";
import { convertHandlers } from './converTemp.js';

const apiKey = 'e186479a64f57dec494e256f54b201aa';
const baseUrl = 'https://api.openweathermap.org/data/2.5';
const text = document.querySelector(".city");
const degrees = document.querySelector("#degree");
const btn = document.querySelector(".search-button");
const inp = document.querySelector(".type-city");
const time = document.querySelector("#time")
const local =document.querySelector(".local-data")
const iconCurrentWeather = document.querySelector(".icon-weather")
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
let icon = document.querySelectorAll(".icon-day-weather");
const dayWeather =document.querySelectorAll(".day-weather");
let temper = null;

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

btn.addEventListener('click', () => {
  let city = inp.value;
  const currentWeatherUrl = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(currentWeatherUrl)
    .then(response => {
      text.innerHTML = response.data.name;
      degrees.innerHTML = Math.round(response.data.main.temp);
      humidity.innerHTML = response.data.main.humidity;
      wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
      iconCurrentWeather.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
      // Get forecast for 7 days
      return axios.get(forecastUrl);
    })
    .then(response => {
      // Display the forecast using code 2
      displayForecast(response.data.list);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function displayForecast(dailyForecast) {
  const dateDailyForecast = dailyForecast.filter(item => item.dt_txt.includes('12:00'));
  let forecastElement = document.querySelector(".week-weather-container");
  let forecastHTML = '';

  dateDailyForecast.forEach((dayForecast, index) => {
    const forecastDate = new Date(dayForecast.dt * 1000);
    const dayOfWeek = forecastDate.getDay();
    const dayName = days[dayOfWeek];
    const dayNumber = forecastDate.getDate();
    const monthName = months[forecastDate.getMonth()];
    const dayMaxTemp = Math.round(dayForecast.main.temp_max);
    const dayMinTemp = Math.round(dayForecast.main.temp_min);
    const weatherIcon = dayForecast.weather[0].icon;

    forecastHTML +=
      `
        <div class="week-weather">
          <div class="col-2">
            <h3 class="day-week">${dayName}</h3>
            <h2 class="day-month">${dayNumber}/${monthName}</h2>
            <img
              class="icon-day-weather"
              src="http://openweathermap.org/img/wn/${weatherIcon}.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="day-weather day-weather-max">min ${dayMaxTemp}°C /</span>
              <span class="day-weather day-weather-min">max ${dayMinTemp}°C</span>
            </div>
          </div>
        </div>
      `;
  });
  forecastElement.innerHTML = forecastHTML;
}



//add local forecast
local.onclick =()=>{
  function showWeather(response) {
    let temp = Math.round(response.data.main.temp);
    text.innerText = `${response.data.name}`;
    degrees.innerHTML = `${temp}`;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
    iconCurrentWeather.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
    const localForecastUrl = `${baseUrl}/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
    axios.get(localForecastUrl)
      .then(response => {
        // Display the local forecast using code 2
        displayForecast(response.data.list);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  function retrievePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather)
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
  
}


//get time
setInterval(getTime, 1000);
getTime()
//convert in fahrenheit
convertHandlers(temper)