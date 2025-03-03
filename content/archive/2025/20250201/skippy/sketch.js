
h = 800
w = 800

things = Array(1000);

function create_obs(obs){
  for (let index = 0; index < obs.length; index++) {
    obs[index] = new thing();
    
  }
}

function setup() {
  createCanvas(w, h);
  
  create_obs(things);

}

class Point {
  x;
  y;
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

fac = 0.005

class thing {
  
  pos 
  vel
  veln
  constructor () {
    this.pos = new Point(0, 0)
    this.vel = new Point(random(-1,1), random(-1,1))
    this.veln = new Point(random(-100,100), random(-100,100))
  }

  update() {
    this.pos = new Point(w*noise(this.veln.x), h*noise(this.veln.y))
    this.veln = new Point(this.veln.x + fac, this.veln.y +  fac)
    this.vel = new Point(fac + this.vel.x , fac + this.vel.y )
  }

  draw() {
    strokeWeight(10)
    color(220,230,10, 100)
    point(this.pos.x, this.pos.y)
  }
}


function draw() {
  if (frameCount == 1) {
    background(220);

  }
  strokeWeight(0)
  color(220, 100, 10, 1)
  rect(0,0,w, h)
  
  for (const thing of things) {
    thing.update()
  }
  for (const thing of things) {
    thing.draw()
  }
  for (let index = 0; index < 50; index++) {
    things.shift()
    
  }

  for (let index = 0; index < 50; index++) {
    things.push(new thing())
  }

}
