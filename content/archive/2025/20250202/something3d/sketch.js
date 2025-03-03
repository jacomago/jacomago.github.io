
w = 1000
h = 800
function setup() {
  let cnv = createCanvas(w, h, WEBGL);

}

function draw() {

  background(250)
  fill(100,100,0,100)
  noStroke();
  rotateX(frameCount/100 % 360)
  rotateY(frameCount/100 % 360)
  rotateZ(frameCount/10000)
  box(50,500,555,5,5 )

}
