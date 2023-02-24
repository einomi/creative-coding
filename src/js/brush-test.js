import p5 from 'p5';

import Brush from './modules/brush/brush';

const sketch = /** @param {import("p5")} p */ (p) => {
  const brush = new Brush(p);

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    // device pixel ratio
    const dpr = window.devicePixelRatio;
    // get the canvas element
    // @ts-ignore
    const canvas = p.canvas;
    // set the canvas size to the window size
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    // set the canvas size to the window size
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    // set the drawing context to the canvas
    p.drawingContext.scale(dpr, dpr);
    // hsb color mode
    p.colorMode(p.HSB, 360, 100, 100, 100);

    p.noLoop();
  };

  p.draw = () => {
    p.background(10);
    for (let i = 0; i < 16; i += 1) {
      brush.setColor(p.color(p.random(360), 50, 90));
      brush.makeStroke(
        p.createVector(p.random(0, p.width), p.random(0, p.height)),
        p.createVector(p.random(0, p.width), p.random(0, p.height))
      );
    }
  };
};

new p5(sketch);
