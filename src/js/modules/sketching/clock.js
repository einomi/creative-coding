// @ts-ignore
import { Q5 } from '../q5';

/** @type {import("p5")} */
// @ts-ignore
const p = new Q5();

p.setup = function () {
  p.createCanvas(240, 120);
  p.strokeWeight(12);
};

p.draw = function () {
  p.background(204);
  p.stroke(255);
  p.line(120, 60, p.mouseX, p.mouseY); // White line stroke(0);
  const mx = p.map(p.mouseX, 0, p.width, 60, 180);
  p.line(120, 60, mx, p.mouseY); // Black line
};
