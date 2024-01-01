import { Q5 } from './modules/q5';

const button = document.querySelector('[data-enter-button]');
const audioEl = document.querySelector('[data-audio]');
const enterContainerEl = document.querySelector('[data-enter]');

button.addEventListener('click', () => {
  enterContainerEl.remove();
  audioEl.play();
});

/** @type {import("p5")} */
// @ts-ignore
const p = new Q5();

p.setup = function () {
  p.createCanvas(window.innerWidth, window.innerHeight);
};

let time = 0;

p.draw = function () {
  p.background(0);

  // draw lines
  p.stroke(20, 255, 20);
  p.strokeWeight(1);
  p.line(
    0,
    (p.height / 2) * p.random(1, 10) * p.noise(time),
    p.width * p.random(1, 10),
    p.height / 2
  );
  p.line(
    p.width / 2 - p.height / 2,
    0,
    (p.random(1, 10) * p.width) / 2,
    p.height
  );

  time += 1;
};
