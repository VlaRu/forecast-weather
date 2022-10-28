
// write your code here
const text = document.querySelector(".city");
const degrees = document.querySelector("#degree");
const btn = document.querySelector(".search-button");
const inp = document.querySelector(".type-city");
const time = document.querySelector("#time")
const fahrenheit = document.querySelector('.f')
const celsius = document.querySelector('.c')
const local =document.querySelector(".local-data")

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


btn.onclick = function () { 
  let city;
  if (inp.value !== "") {
    text.innerText = inp.value;
    city = inp.value;
    inp.value = ''
  }
  // = 'barcelona';
  let unit = ["metric", "imperial"];
  let apiKey = "e186479a64f57dec494e256f54b201aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit[0]}`;
  function displayComments(response) {
    let temper = Math.round(response.data.main.temp);
    degrees.innerHTML = `${temper}`;
    console.log(temper);
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayComments);
}

local.onclick = function () {
  function showWeather(response) {
    console.log(response);   
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