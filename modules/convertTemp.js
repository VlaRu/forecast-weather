
export function convertHandlers(initialTemp) {
  const fahrenheit = document.querySelector(".f");
  const celsius = document.querySelector(".c");
  const degrees = document.querySelector("#degree");

  fahrenheit.onclick = (e) => {
    e.preventDefault()
    degrees.innerHTML  = Math.floor((initialTemp * 9) / 5 + 32);
    celsius.classList.remove("highlights");
    fahrenheit.classList.add("highlights");
  }

  //convert in celsius
  celsius.onclick = (e) => {
    e.preventDefault()
    degrees.innerHTML = initialTemp;
    fahrenheit.classList.remove("highlights");
    celsius.classList.add("highlights");
  }
}