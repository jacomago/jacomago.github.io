
dataURL = "https://www.lmfdb.org/zeros/zeta/?limit=10000&N=1"
let csvData

w = 600
h = 600
r = 200
function setup() {
  let cnv = createCanvas(w, h);
}
noise_coeff = 1

color_scheme = [50, 100, 150, 200, 250]
stroke_weights = [1, 3, 5]
alphas = [30, 70]
function draw() {
  frameRate(10)
  if (frameCount % 60 == 1) {

    background(250)
  }

  colorMode(HSB)
  stroke(color_scheme[frameCount % color_scheme.length], 70, 60, alphas[frameCount % alphas.length])
  strokeWeight(stroke_weights[frameCount % stroke_weights.length])
  y = h * noise(frameCount * noise_coeff)
  line(0, y, 600, y)
  x = w * noise(-frameCount * noise_coeff)
  line(x, 0, x, 600)

}
