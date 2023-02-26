import p5 from 'p5';

import Brush from '../brush/brush';

const sketch = /** @param {import("p5")} p */ (p) => {
  let shader;
  let screen;
  let brushTexture;

  p.preload = () => {
    shader = p.loadShader(
      '/brush-test/shaders/vertex.glsl',
      '/brush-test/shaders/fragment.glsl'
    );

    brushTexture = p.loadImage('/brush-test/textures/brush.png');
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
    shader.setUniform('uTexture', screen);
    shader.setUniform('uTextureBrush', brushTexture);
    p.rect(0, 0, p.width, p.height);
  }

  p.draw = () => {
    screen.background(0);

    const lineCount = 10;
    const lineGap = 35;
    const screenOffset = 100;

    for (let i = 0; i < lineCount; i += 1) {
      const brush = new Brush(screen);
      brush.setColor(
        p.color(
          p.random(50, 300),
          p.random(50, 80),
          p.random(50, 90),
          p.random(10, 30)
        )
      );
      brush.makeStroke(
        p.createVector(screenOffset, screenOffset + i * lineGap),
        p.createVector(
          p.width - screenOffset,
          p.height - screenOffset - lineCount * lineGap + lineGap + i * lineGap
        )
      );
    }

    drawScreen();
  };
};

new p5(sketch);
