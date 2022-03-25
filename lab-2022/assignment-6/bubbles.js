let bubbles = document.querySelectorAll('.bubble');
let container = document.querySelector('#container');
  
// bubbles.forEach(function (bubble) {
//   bubble.style.left = (90 * Math.random()) + '%';
//   bubble.style.top = (90 * Math.random()) + '%';
// });

container.addEventListener('click', function (event) {
  if (event.target.classList.contains('bubble')) {
    event.target.remove();
  }
});