w = 400
h = 800

wf = 1.0/w
hf = 1.0/h
function setup() {

  createCanvas(w, h);
  frameRate(1)
}

function squarebox() {

  for (let x = 0; x < w; x=x+5) {
    for (let y = 0; y < h; y=y+5) {
      nx = int(255*noise(x * wf ))
      ny = int(255*noise(y * hf ))
      
      fill(nx ,ny ,100);
      circle(x,y,5);
    }
    
  }
}

function draw() {
  background(0);
  translate(w/2, h/2)

  colorMode(HSB)
  noStroke()
  for (let count = 0; count < 360; count+=4) {
    rad = count
    for (let rc = -h/4; rc < h/4;rc+=5 )
    {
      r = (h/2)*sin((90*noise(rc, rad)))
      nx = int(255*noise(rad ));
      ny = int(255*noise(r ));
      x = sin(rad) * r ;
      y = cos(rad) * r ;
      cn = noise(x,y);
      fill(cn*360 , 80,100, 0.5);
      circle(x,y,10);

    }
  }
}
