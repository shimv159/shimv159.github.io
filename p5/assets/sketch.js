
let bgcolor;
//create variable for input
let input;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  frameRate(15);
  canvas.position(0, 0);
  canvas.class("container");

  //create a random fill
  bgcolor = {r: 0, g: 255, b:255};
  bgcolor.r = random(0, 255);
  bgcolor.g = random(0, 255);
  bgcolor.b = random(0,255);

  //create a div for our value
  // birthday = createDiv("Your birthday");
  // birthday.class("birthday");

  //create input
  input = createInput("whats your bday");
  //adds a class to the input
  input.class("input");

}


function draw() {
  background(bgcolor.r,bgcolor.g,bgcolor.b);
  //target the HTML value of our variable birthday, and set the contents to be the value of our variable input
  // birthday.html(input.value());

  for (let i = 0; i < 320; i++) {
      push();
      fill(random(255), bgcolor.g, bgcolor.b);
      translate(random(width), random(height));
      rotate(random(5 * HALF_PI));
      textSize(20);
      text(input.value(), 20, 0);
      pop();
    }

}