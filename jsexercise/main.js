let body = document.body;

function turnOnLight1() {
  body.classList.add("light1");
  button.classList.add("button1On");
}

let button = document.querySelector(".button1");
button.addEventListener("click", turnOnLight1);
