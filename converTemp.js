
export function convertHandlers(initialTemp) {
  const fahrenheit = document.querySelector(".f");
  const celsius = document.querySelector(".c");
  const degrees = document.querySelector("#degree");

  fahrenheit.onclick = (e) => {
    e.preventDefault()
    degrees.innerHTML  = Math.floor((initialTemp * 9) / 5 + 32);
  }
  
  //convert in celsius
  celsius.onclick = (e) => {
    e.preventDefault()
    degrees.innerHTML = initialTemp;
  }
}

/*if you celsius.onclick class="c" will add class active, and if you fahrenheit.onclick class="f" will add class active*/