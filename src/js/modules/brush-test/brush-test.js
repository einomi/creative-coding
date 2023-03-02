import p5 from 'p5';

import Brush from '../brush/brush';

const lineCount = 20;
const screens = [];

const sketch = /** @param {import("p5")} p */ (p) => {
  let shader;
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
    for (let i = 0; i < lineCount; i += 1) {
      const screen = p.createGraphics(p.width, p.height);
      screen.colorMode(p.HSB, 360, 100, 100, 100);
      screens.push(screen);
    }

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

    p.noLoop();
  };

  // function drawScreens() {
  //   screens.forEach((screen) => {
  //     p.shader(shader);
  //     shader.setUniform('uTexture', screen);
  //     shader.setUniform('uTextureBrush', brushTexture);
  //     p.rect(0, 0, p.width, p.height);
  //   });
  // }

  p.draw = () => {
    const lineGap = 35;
    const screenOffset = 100;
    // screens[0].background(0);
    p.background(0);

    for (let i = 0; i < lineCount; i += 1) {
      // screens[i].background(100, 100, 100, 0.4);
      const brush = new Brush(screens[i]);
      brush.setColor(
        p.color(
          p.random(50, 120),
          p.random(50, 80),
          p.random(20, 70),
          p.random(10, 30)
        )
      );
      brush.makeStroke(
        p.createVector(screenOffset, screenOffset + i * lineGap),
        p.createVector(
          p.width - screenOffset,
          p.height - screenOffset - i * lineGap
        )
      );
      const diffusionFactor = p.random(0.3, 1.5);
      const periodFactor = p.random(10, 100);
      shader.setUniform('uTexture', screens[i]);
      shader.setUniform('uTextureBrush', brushTexture);
      shader.setUniform('uDiffusionFactor', diffusionFactor);
      shader.setUniform('uPeriodFactor', periodFactor);
      p.texture(screens[i]);
      p.shader(shader);

      p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
    }

    // for (let i = 0; i < lineCount; i += 1) {
    //   const brush = new Brush(screen);
    //   brush.setColor(
    //     p.color(p.random(50, 300), 0, p.random(20, 60), p.random(10, 30))
    //   );
    //   brush.makeStroke(
    //     p.createVector(p.width - screenOffset, screenOffset + i * lineGap),
    //     p.createVector(
    //       screenOffset,
    //       p.height - screenOffset - lineCount * lineGap + lineGap + i * lineGap
    //     )
    //   );
    // }

    // drawScreens();
  };

  // screenshots
  p.keyPressed = () => {
    if (p.key === 's') {
      p.saveCanvas(p.canvas, 'sketch');
    }
  };
};

new p5(sketch);
