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
  p.stroke(0);
};

let time = 0;

p.draw = function () {
  p.background(255);
  const linesCount = 6;
  [...Array(linesCount)].forEach((_, index) => {
    p.beginShape();
    p.noFill();
    p.vertex(p.width / linesCount + index * 200, 0);
    p.vertex(
      100 + p.width / linesCount + index * 200 + Math.cos(time) * 100,
      p.height / 2
    );
    p.vertex(
      -150 + p.width / linesCount + index * 200 + Math.sin(time) * 500,
      p.height
    );
    p.endShape();
  });

  time += 0.001;
};
