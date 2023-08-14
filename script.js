
// write your code here
const text = document.querySelector(".city");
const degrees = document.querySelector("#degree");
const btn = document.querySelector(".search-button");
const inp = document.querySelector(".type-city");
const time = document.querySelector("#time")
const fahrenheit = document.querySelector(".f")
const celsius = document.querySelector(".c")
const local =document.querySelector(".local-data")
const iconCurrentWeather = document.querySelector(".icon-weather")
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const dayWeek = document.querySelectorAll(".day-week");
let icon = document.querySelectorAll(".icon-day-weather");
const dayWeather =document.querySelectorAll(".day-weather");

let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//let city = Object.keys(weather).filter((item) => {if(item == inp.value){return item}})

// add time
function getTime() {
 // days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let date = new Date()
  let dateWeek = date.getDay()
  let hour = date.getHours()
  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `${days[dateWeek]} ${hour}:${minutes} `
}
setInterval(getTime, 1000);
getTime()
let temper = null;

//convert in fahrenheit
fahrenheit.onclick = function changeFahrenheit(e) {
  e.preventDefault()
  degrees.innerHTML  = Math.floor((temper * 9) /5 +32);
}

//convert in celsius
celsius.onclick = function changeFahrenheit(e) {
  e.preventDefault()
  degrees.innerHTML  = temper;
}

// get Week forecast
/* function getWeekForecast(coord) {
  //response.data

  let latitude = coord.coord.lat;
  let longitude = coord.coord.lon;
  let temp = Math.round(coord.main.temp);
  let tempMin = Math.round(coord.main.temp_min);
  let icon1 = coord.weather[0].icon;
  let forecast = coord.dt;
  console.log(forecast);
  
  let apiKey = "e186479a64f57dec494e256f54b201aa";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=daily&appid=${apiKey}&units=metric`;

  


  dayWeather.forEach((day,index) =>{
    day.innerHTML = `${temp}°C | ${tempMin}°C`;
  })
  icon.forEach((item)=> {item.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon1}@2x.png`
    )})
  axios.get(apiUrl).then(getWeekForecast); 
} */
function displayForecast() {
  let forecastElement = document.querySelector(".week-weather-container");

  let forecastHTML = `<div class="week-weather">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <h3 class="day-week">${day}</h3>
        <img
          class="icon-day-weather"
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="day-weather">0</span>
          <span class="day-weather">0</span>
        </div>
      </div>
    `;
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    //axios.get(apiUrl).then(getWeekForecast); 
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

btn.onclick = function() {   
  let unit;
  let city;
  if (inp.value !== "") {
    text.innerText = inp.value;
    city = inp.value;
    inp.value = ''
  }

  unit = ["metric", "imperial"];
  let apiKey = "e186479a64f57dec494e256f54b201aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit[0]}`;
  
  function displayComments(response) {
    temper = Math.round(response.data.main.temp);
    degrees.innerHTML = `${temper}`;
    iconCurrentWeather.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    wind.innerHTML = Math.round(response.data.wind.speed);
    humidity.innerHTML = response.data.main.humidity;    
    getWeekForecast(response.data);

  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayComments); 
}





//add local forecast
local.onclick = function () {
  function showWeather(response) {
    let temp = Math.round(response.data.main.temp);
    text.innerText = `${response.data.name}`;
    degrees.innerHTML = `${temp}`;
  }
  function retrievePosition(position) {
    let apiKey = "e186479a64f57dec494e256f54b201aa";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
    }
    navigator.geolocation.getCurrentPosition(retrievePosition);
}

dayWeek.forEach((day,index) =>{
    day.innerHTML = days[index]
})

displayForecast()