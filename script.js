
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


//let city = Object.keys(weather).filter((item) => {if(item == inp.value){return item}})

// add time
function getTime() {
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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

fahrenheit.onclick = function changeFahrenheit(e) {
  e.preventDefault()
  degrees.innerHTML  = Math.floor((temper * 9) /5 +32);
}

celsius.onclick = function changeFahrenheit(e) {
  e.preventDefault()
  degrees.innerHTML  = temper;
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
  }
  
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayComments);
 
}





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





/* fahrenheit.onclick = function() {
  degrees.innerText = '50';
}
celsius.onclick = function() {
  degrees.innerText = '10';
} */