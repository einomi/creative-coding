// @ts-ignore
import { Q5 } from '../../q5';

import SnowFlake from './snow-flake';

/** @type {import("p5")} */
// @ts-ignore
const p = new Q5();

/** @typedef SketchProps
 * @property {CanvasRenderingContext2D} context
 * @property {HTMLCanvasElement} canvas
 * @property {number} width
 * @property {number} height
 *  */

/** @type {SnowFlake[]} */
let snowFlakes = [];

function generateSnowFlakes() {
  const windowWidth = window.innerWidth;
  const rangeX = Array(windowWidth)
    .fill(null)
    .map((item, index) => index);

  const randomRangeX = Array(7)
    .fill(null)
    .map(() => {
      const randomIndex = p.random(1, windowWidth);
      return rangeX[randomIndex];
    });

  return randomRangeX.map(() => {
    return new SnowFlake({
      p,
      x: p.random(rangeX),
      y: 0,
      diameter: 4,
      speed: p.random([0.5, 0.55, 0.6]),
    });
  });
}

p.setup = function () {
  p.createCanvas(window.innerWidth, window.innerHeight);
};

let time = 0;

p.draw = function () {
  p.background(0);

  if (time % 200 === 0) {
    snowFlakes = [...snowFlakes, ...generateSnowFlakes()];
  }

  snowFlakes.forEach((item) => {
    item.animateFalling();
  });

  time += 1;
};
