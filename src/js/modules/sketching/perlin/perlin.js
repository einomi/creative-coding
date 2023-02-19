import p5 from 'p5';

/** @typedef SketchProps
 * @property {CanvasRenderingContext2D} context
 * @property {HTMLCanvasElement} canvas
 * @property {number} width
 * @property {number} height
 *  */

const sketch = /** @param {import("p5")} p */ (p) => {
  p.setup = () => {
    p.noiseSeed(1);
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
    p.background(0);
  };

  let time = 0;

  p.frameRate(60);

  p.draw = () => {
    // perlin noise function on x axis
    const color = p.random(0, 50);
    p.stroke(color);
    // fill
    p.beginShape();
    p.fill(30);

    const radius = p.height / 4;
    const radius2 = p.width / 4;
    const rand = p.noise(time * 0.01) * 3;

    function drawPoint(x) {
      p.vertex(
        p.sin(x * 0.01) * radius2 * rand + p.width / 2,
        p.cos(x * 0.01) * radius * rand + p.height / 2
      );
    }

    drawPoint(time);
    p.vertex(p.width / 2, p.height / 2);
    for (let i = 10; i > 0; i -= 1) {
      const pastTime = time - i;
      if (pastTime > 0) {
        drawPoint(pastTime);
      }
    }
    p.endShape();

    time += 1;
  };
};

new p5(sketch);
