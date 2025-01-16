import { convertHandlers } from './convertTemp.js';

function displayForecast(dailyForecast) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  let forecastElement = document.querySelector(".week-weather-container");
  let forecastHTML = '';

  const dateDailyForecast = dailyForecast
    .filter(item => item.dt_txt.includes('12:00'))
    .forEach((dayForecast, index) => {
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
          <h3 class="day-week">${dayName}</h3>
          <h2 class="day-month">${dayNumber}/${monthName}</h2>
          <div class="week-weather-info">
            <img
              class="icon-day-weather"
              src="http://openweathermap.org/img/wn/${weatherIcon}.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="day-weather day-weather-max">min ${dayMaxTemp}°C</span><br>
            </div>
          </div>
        </div>
      `;
  });
  forecastElement.innerHTML = forecastHTML;
}

function displayCurrentWeather(response){
  const text = document.querySelector(".city");
  const iconCurrentWeather = document.querySelector(".icon-weather")
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");
  const degrees = document.querySelector("#degree");

  text.innerHTML = response.name;
  degrees.innerHTML = Math.round(response.main.temp);
  humidity.innerHTML = response.main.humidity;
  wind.innerHTML = Math.round(response.wind.speed * 3.6);
  iconCurrentWeather.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
  convertHandlers(Math.round(response.main.temp))
}

export {displayForecast, displayCurrentWeather}