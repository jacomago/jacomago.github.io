
w = 1000
h = 800
function setup() {
  let cnv = createCanvas(w, h, WEBGL);

}

function draw() {

  // Move the camera to the top-right.
  orbitControl();
  
  background(250)
  directionalLight(255, 255, 255, 0, 0, 0);
  ambientLight(255, 255, 255);
  directionalLight(200, 200, 200, 600, 600, 0);

  frameRate(30)
  colorMode(HSB)
  fill(100,60,80,100)
  rotateX(-50/100 % 360)
  rotateY(frameCount/100 % 360)

  for (let j = -5; j < 5; j++) {
    for (let k = -5; k < 5; k++) {
      push()
    translate(j * 100,0,k * 100)
    x = 3
    z = 3
    for (let i = 0; i < 50 * abs(sin(0.1 * frameCount / PI)); i++) {
      colorMode(HSB)
      ambientMaterial((10 +i*7) % 360 ,80,90)
      box(60,5,60 )
      translate(x,pow(-1, i)*i * 6,z)
      
    }
    pop()
  }
  }
}
