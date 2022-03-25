let bubbles = document.querySelectorAll('.bubble');
let container = document.querySelector('#container');
  
container.addEventListener('click', function (event) {
  if (event.target.classList.contains('bubble')) {
    event.target.remove();
  }
});
