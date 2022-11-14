// @ts-ignore
import { Q5 } from '../q5';

/** @type {import("p5")} */
// @ts-ignore
const p = new Q5();

/** @typedef SketchProps
 * @property {CanvasRenderingContext2D} context
 * @property {HTMLCanvasElement} canvas
 * @property {number} width
 * @property {number} height
 *  */

p.setup = function () {
  p.createCanvas(window.innerWidth, window.innerHeight);
  p.strokeWeight(8);
};

let time = 0;

p.draw = function () {
  p.background(255);
  p.stroke(0);
  const linesCount = 6;
  [...Array(linesCount)].forEach((_, index) => {
    p.line(
      p.width / linesCount + index * 200,
      0,
      50 + p.width / linesCount + Math.sin(time) * 500,
      p.height
    );
  });

  time += 0.001;
};
