import p5 from 'p5';

import Brush from '../brush/brush';

const sketch = /** @param {import("p5")} p */ (p) => {
  let shader;
  let screen;

  p.preload = () => {
    shader = p.loadShader(
      '/brush-test/shaders/vertex.glsl',
      '/brush-test/shaders/fragment.glsl'
    );
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    // create a screen buffer
    screen = p.createGraphics(p.width, p.height);

    // // device pixel ratio
    // const dpr = window.devicePixelRatio;
    // // get the canvas element
    // // @ts-ignore
    // const canvas = p.canvas;
    // // set the canvas size to the window size
    // canvas.style.width = `${window.innerWidth}px`;
    // canvas.style.height = `${window.innerHeight}px`;
    // // set the canvas size to the window size
    // canvas.width = window.innerWidth * dpr;
    // canvas.height = window.innerHeight * dpr;
    // // set the drawing context to the canvas
    // p.drawingContext.scale(dpr, dpr);
    // // hsb color mode

    p.colorMode(p.HSB, 360, 100, 100, 100);
    screen.colorMode(p.HSB, 360, 100, 100, 100);

    p.shader(shader);

    p.noLoop();
  };

  function drawScreen() {
    shader.setUniform('u_texture', screen);
    p.rect(0, 0, p.width, p.height);
  }

  p.draw = () => {
    screen.background(10);

    for (let i = 0; i < 9; i += 1) {
      const brush = new Brush(screen);
      brush.setColor(p.color(p.random(360), 50, 90, p.random(10, 30)));
      brush.makeStroke(
        p.createVector(p.random(0, p.width), p.random(0, p.height)),
        p.createVector(p.random(0, p.width), p.random(0, p.height))
      );
    }

    drawScreen();
  };
};

new p5(sketch);
