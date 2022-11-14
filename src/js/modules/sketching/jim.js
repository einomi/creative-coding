// @ts-ignore
import { Q5 } from '../q5';

/** @type {import("p5")} */
// @ts-ignore
const p = new Q5();

/** @type {import("p5").Image} */
let img;

/** @type {any[][]} */
const cells = [];

p.preload = function () {
  img = p.loadImage('/jim.jpeg');
};

p.setup = function () {
  p.createCanvas(240, 120);
  p.strokeWeight(12);
};

p.draw = function () {
  if (cells.length === 0) {
    return;
  }
  for (let col = 0; col < img.width; col += 10) {
    for (let row = 0; row < img.height; row += 10) {
      const cell = cells[col][row];
      if (cell) {
        p.fill(p.color(cell));
      }
      const randomVal = p.random(5, 50);
      p.rect(col, row, randomVal, randomVal);
    }
  }
};
