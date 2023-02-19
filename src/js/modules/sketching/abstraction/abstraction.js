// @ts-ignore
import { Q5 } from '../../q5';

/** @type {import("p5")} */
// @ts-ignore
const p = new Q5();

/** @typedef SketchProps
 * @property {CanvasRenderingContext2D} context
 * @property {HTMLCanvasElement} canvas
 * @property {number} width
 * @property {number} height
 *  */

// create Line class
class Line {
  constructor(x1, y1, x2, y2, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
  }

  draw() {
    const color = p.random(30, 60);
    p.stroke(color, color, color);
    p.strokeWeight(p.random([1, 2, 3, 4]));
    p.line(this.x1, this.y1, this.x2, this.y2);
  }
}

p.setup = function () {
  p.createCanvas(window.innerWidth, window.innerHeight);
};

let time = 0;

/** @type {Line[]} */
const lines = [];

const linesCount = 1000;

for (let i = 0; i < linesCount; i += 1) {
  // save line to array
  lines.push(new Line(i * 100, 0, i * 100, window.innerHeight, 255));
}

// set fps
p.frameRate(8);

p.draw = function () {
  p.background(0);

  // draw horizontal line with p5
  p.stroke(25);
  p.strokeWeight(200);
  p.line(0, p.height / 2, p.width, p.height / 2);

  for (let i = 0; i < linesCount; i += 1) {
    lines[i].x1 = p.map(p.noise(10 * time + i), 0, 1, 0, p.width);
    lines[i].x2 = p.map(p.noise(10 * time + i + 10), 0, 1, 0, p.width);
    lines[i].draw();
  }

  time += 1;
};
