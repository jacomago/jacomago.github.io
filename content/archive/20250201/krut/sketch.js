
w = 500
h = 800

obs = Array(1000)

function setup() {
  createCanvas(w, h);
  create_obs(obs);
}

class Point {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function apply_velocity(pos, vel) {
  return new Point(pos.x + vel.x, pos.y + vel.y)
}

class Ob {
  pos;
  vel;
  health;
  c;
  constructor(){
    this.pos = new Point(0,0)
    this.vel = new Point(random(-1,1), random(-1,1))
    this.health = w
    this.c = random(0,360);
  }

  reset() {
    this.pos = new Point(0,0)
    this.vel = new Point(random(-1,1), random(-1,1))
    this.health = w
    this.c = random(0,360);
  }

  update() {
    this.pos = apply_velocity(this.pos, this.vel);
    this.health = w-abs(this.pos.y);
    if (this.health < 10) {
      this.reset()
    }
  }

  draw() {
    if (this.health < 0) {
      return
    }
    stroke(this.c, 80, 80, 0.01)
    point(this.pos.x, this.pos.y);
  }
}

function create_obs(obs){
  for (let index = 0; index < obs.length; index++) {
    obs[index] = new Ob();
    
  }
}

function draw_obs(obs) {
  for (const ob of obs) {
    ob.draw()
  }
}

function update_obs(obs) {
  for (const ob of obs) {
    ob.update()
  }
}

function draw() {
  if (frameCount ==1) {

    background(0);
  }
  
  translate(w/2, h/2)

  strokeWeight(10)
  colorMode(HSL)
  update_obs(obs)
  draw_obs(obs)

}
