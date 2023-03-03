import p5 from 'p5';
import niceColors from 'nice-color-palettes/1000.json';

import Brush from '../brush/brush';

const lineCount = 12;
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

    // anti-aliasing
    // p.noSmooth();
    p.pixelDensity(3);

    // create a screen buffer
    for (let i = 0; i <= lineCount; i += 1) {
      const screen = p.createGraphics(p.width, p.height);
      screen.pixelDensity(3);
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

    p.background(255);

    p.colorMode(p.HSB, 360, 100, 100, 100);

    p.noLoop();
  };

  p.draw = () => {
    const screenOffset = 50;

    function pickPallete() {
      return niceColors[p.round(p.random(0, niceColors.length))];
    }
    const colors = [...pickPallete(), ...pickPallete(), ...pickPallete()];

    for (let i = 0; i <= lineCount; i += 1) {
      // screens[i].background(100, 100, 100, 0.4);
      // screens[i].colorMode(p.HSB, 360, 100, 100, 100);
      const brush = new Brush(screens[i]);
      brush.setColor(p.color(p.hue(colors[i % colors.length]), 50, 90, 100));
      brush.makeStroke(
        p.createVector(
          p.random(screenOffset, p.width - screenOffset),
          p.random(screenOffset, p.height - screenOffset)
        ),
        p.createVector(
          p.random(screenOffset, p.width - screenOffset),
          p.random(screenOffset, p.height - screenOffset)
        )
      );
      const diffusionFactor = p.random(0.1, 1.2);
      const periodFactor = p.random(10, 20);
      shader.setUniform('uTexture', screens[i]);
      shader.setUniform('uTextureBrush', brushTexture);
      shader.setUniform('uDiffusionFactor', diffusionFactor);
      shader.setUniform('uPeriodFactor', periodFactor);
      p.texture(screens[i]);
      p.shader(shader);
      p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
    }
  };

  // screenshots
  p.keyPressed = () => {
    if (p.key === 's') {
      p.saveCanvas(p.canvas, 'sketch');
    }
  };
};

new p5(sketch);
