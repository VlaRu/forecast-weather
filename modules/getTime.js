// add time
function getTime() {
  let days= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fr", "Sat"];
  let date = new Date()
  let dateWeek = date.getDay()
  let hour = date.getHours()
  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `${days[dateWeek]} ${hour}:${minutes} `
}

export {getTime};