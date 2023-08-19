
export function convertHandlers(initialTemp) {
  const fahrenheit = document.querySelector(".f");
  const celsius = document.querySelector(".c");
  const degrees = document.querySelector("#degree");
  let currentTemp = initialTemp;

  fahrenheit.onclick = (e) => {
    e.preventDefault()
    currentTemp  = Math.floor((initialTemp * 9) / 5 + 32);
    degrees.innerHTML = currentTemp;
  }
  
  //convert in celsius
  celsius.onclick = (e) => {
    e.preventDefault()
    //degrees.innerHTML  = `${temp}`;
    degrees.innerHTML = initialTemp;
  }
}

