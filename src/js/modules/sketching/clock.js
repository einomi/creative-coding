// @ts-ignore
import { Q5 } from '../q5';

/** @type {import("p5")} */
// @ts-ignore
const p = new Q5();

/** @param {import("p5")} p */
// eslint-disable-next-line id-length

/** @type {import("p5").Image} */
// let img;
/** @type {HTMLCanvasElement | undefined} */

/** @type {any[][]} */
// const cells = [];

// p.preload = function () {
//   img = p.loadImage('/jim.jpeg');
// };

p.setup = function () {
  p.createCanvas(240, 120);
  p.strokeWeight(12);
};

// p.draw = function () {
//   if (cells.length === 0) {
//     return;
//   }
//   for (let col = 0; col < img.width; col += 10) {
//     for (let row = 0; row < img.height; row += 10) {
//       const cell = cells[col][row];
//       if (cell) {
//         p.fill(p.color(cell));
//       }
//       //     // p.stroke(p.color(cell))
//       //     // p.point(col, row);
//       const randomVal = p.random(5, 50);
//       p.rect(col, row, randomVal, randomVal);
//     }
//   }
// };

// p.draw = function () {
//   p.fill(128, 128);
//   p.noStroke();
//   p.ellipse(p.mouseX, p.mouseY, p.random(5, 100));
// };

p.draw = function () {
  p.background(204);
  p.stroke(255);
  p.line(120, 60, p.mouseX, p.mouseY); // White line stroke(0);
  const mx = p.map(p.mouseX, 0, p.width, 60, 180);
  p.line(120, 60, mx, p.mouseY); // Black line
};
