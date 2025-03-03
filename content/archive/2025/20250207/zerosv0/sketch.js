
dataURL = "https://www.lmfdb.org/zeros/zeta/?limit=10000&N=1"
let csvData


// preload waits for all of our data to finish loading
// before it runs setup or draw!
function preload() {

  loadStrings("/archive/2025/20250207/zerosv0/zetazeros.csv", handleData);

}
function handleData(array) {
  csvData =  array.map(line => line.split(" ").map(el => float(el)))
}

w = 600
h = 600
r = 200
function setup() {
  let cnv = createCanvas(w, h);
  print(csvData)
}

function draw() {

  if (frameCount == 1) {

    background(250)
  }
  zero = csvData[frameCount]
  
  if (!zero) {
    return
  }
  frac = zero[1] - int(zero[1])
  frac = frac * 100

  stroke(250, 0, 0,50);
  noFill();
  translate(width>>1,height>>1);
  beginShape();
  let ang = frameCount*360/100 + frameCount;  
  let x = (2*r/3+frac)*cos(radians(ang));
  let y = (2*r/3+frac)*sin(radians(ang));
  let xd = (r)*cos(radians(ang));
  let yd = (r)*sin(radians(ang)); 
  line(x,y,xd,yd);
  vertex(x,y);
  
  endShape();
  noFill();
  stroke(250, 0, 0,50);
  fill(0);

}
