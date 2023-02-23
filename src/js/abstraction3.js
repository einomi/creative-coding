import p5 from 'p5';

import Worm from './modules/worm/worm';

/** @type {Worm[]} */
const worms = [];

const sketch = /** @param {import("p5")} p */ (p) => {
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

    const tileSize = 100;

    /** @param {number} inSize
     * @param {number} x
     * @param {number} y
     * */
    const drawTile = (inSize, x, y) => {
      const noise1 = p.randomGaussian(0, 0.3);

      const isHit = noise1 > 0;

      if (isHit) {
        p.noStroke();

        const hue = p.noise(x * 0.01, y * 0.01, time * 0.05) * 360;
        const color = p.color(
          hue,
          p.random(5, 70),
          p.random(30, 100),
          p.random(80, 100)
        );

        worms.push(new Worm(p, x, y, color));
      }
    };

    // draw the grid
    for (let x = 0; x < p.width; x += tileSize) {
      for (let y = 0; y < p.height; y += tileSize) {
        // draw the tile
        p.push();
        p.translate(x, y);
        drawTile(tileSize, x, y);
        p.pop();
      }
    }

    // p.noLoop();
  };

  let time = 0;

  p.draw = () => {
    p.background(10);
    time += 1;

    worms.forEach((worm) => {
      worm.draw();
    });
  };
};

new p5(sketch);
