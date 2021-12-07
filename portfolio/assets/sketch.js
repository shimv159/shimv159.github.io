function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("home");
  background("white");
  frameRate(30);
}
function draw() {
  ellipse(mouseX, mouseY, 50, 50);
}

function mousePressed() {
  ellipse(mouseX, mouseY, 50, 50);
  background("#C4F0E6");
  frameRate(10);
}

function mouseReleased() {
  background("white");
  frameRate(30);
}

