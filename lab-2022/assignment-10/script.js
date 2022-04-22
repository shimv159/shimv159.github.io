
var r = 0;
var b = 255;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  r =  map(mouseY, 0, 100, 0, 200);
  b = map(mouseX, 0, 200, 270, 0);
  background(r, 0, b);
  ellipse(mouseX, mouseY, 60, 60);
  fill("hotpink");
}


function mouseDragged(){
  fill("white");
}