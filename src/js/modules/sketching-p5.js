// @ts-ignore
import { Q5 } from './q5';

/** @type {import("p5")} */
// @ts-ignore
const p = new Q5();

/** @param {import("p5")} p */
// eslint-disable-next-line id-length

/** @type {import("p5").Image} */
let img;
/** @type {HTMLCanvasElement | undefined} */

/** @type {any[][]} */
const cells = [];

p.preload = function () {
  img = p.loadImage('/jim.jpeg');
};

p.setup = function () {
  p.createCanvas(img.width, img.height);
  for (let col = 0; col < img.width; col += 10) {
    for (let row = 0; row < img.height; row += 10) {
      const cell = img.get(col, row);
      p.fill(p.color(cell));
      if (cells[col]) {
        cells[col][row] = cell;
      } else {
        cells[col] = [cell];
      }
      // p.stroke(p.color(cell))
      // p.point(col, row);
      p.rect(col, row, 10, 50);
    }
  }
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
      //     // p.stroke(p.color(cell))
      //     // p.point(col, row);
      const randomVal = p.random(5, 50);
      p.rect(col, row, randomVal, randomVal);
    }
  }
};
