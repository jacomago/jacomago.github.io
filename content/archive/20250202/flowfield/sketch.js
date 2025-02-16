

function noiseAngle(x, y, noiseScale, noiseStrength) {
  return noise(x/noiseScale, y/noiseScale) * TWO_PI * noiseStrength
}

function direction(angle) {
  return createVector(cos(angle), sin(angle))
}

function randomVec(w, h) {
  return createVector(random(0,w), random(0,h))
}

class Particle {
  pos
  vel
  acc
  noiseStrength

  constructor(w, h,  noiseStrength) {
    this.pos = randomVec(w, h)
    this.vel = createVector(0,0)
    this.noiseStrength = noiseStrength
    var angle = noiseAngle(this.pos.x, this.pos.y, noiseScale,  this.noiseStrength)
    this.acc = direction(angle)
  }

  update() {
    var angle = noiseAngle(noiseCenter.x + this.pos.x, noiseCenter.y + this.pos.y, noiseScale, this.noiseStrength)
    this.acc = direction(angle)
    this.pos = this.pos.add(this.vel)
    this.vel = this.vel.add(this.acc).limit(5)
    this.checkEdges()
  }

  checkEdges(){
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (this.pos.x<0 || this.pos.x>w || this.pos.y<0 || this.pos.y>h) {    
      this.pos.x = random(w);
      this.pos.y = random(h);
    }
  }
  draw() {
    ellipse(this.pos.x, this.pos.y, 2);
  }
}

class Model {
  particles
  w
  h
  noiseStrength
  constructor(num, w, h,  noiseStrength) {
    this.particles = [...Array(num)]
    this.w = w
    this.h = h
    this.noiseStrength = noiseStrength
  }

  init() {
    this.particles = this.particles.map((n) => new Particle(this.w,this.h, this.noiseStrength))
  }
  update() {
    this.particles.forEach((p) => p.update())
  }

  draw() {
    this.particles.forEach((p) => p.draw())

  }
}
w = 1000
h = 800
var sketchModel 
var noiseCenter
var noiseScale = 500
function mouseClicked() {
  noiseCenter = createVector(mouseX, mouseY)
}
function mouseScroll(event) {
  noiseScale = event.deltaY + noiseScale
}


function setup() {
  let cnv = createCanvas(w, h);

  // Call changeBackground() when the
  // mouse wheel moves.
  cnv.mouseWheel(mouseScroll);
  noiseCenter = createVector(0,0)
  sketchModel = new Model(500, w, h, 1)
  sketchModel.init()

}

function draw() {
  fill(10,10);

  noStroke();
  rect(0, 0, w, h);
  sketchModel.update(
  )
  fill(255)
  sketchModel.draw()

}
