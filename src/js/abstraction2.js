import p5 from 'p5';
import gaussian from 'gaussian';

const mean = 0;
const distribution = gaussian(mean, 0.1);

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
    p.background(0);

    // p.noLoop();
  };

  let time = 0;

  p.draw = () => {
    const tileSize = 10;

    /** @param {number} size */
    const drawTile = (size) => {
      const noise1 = distribution.ppf(Math.random());

      const isHit = noise1 > 1;

      if (isHit) {
        p.noStroke();
        p.fill(p.random(0, 100), p.random(5, 70), p.random(5, 100), 100);

        // draw circle with sin cos, loop and perlin noise
        const circleResolution = 10;
        const radius = p.random(1, 10);
        const angleStep = (0.01 * p.TWO_PI) / circleResolution;

        p.beginShape();
        const startAngle = p.random(0.0, p.TWO_PI);
        for (
          let angle = startAngle;
          angle < p.TWO_PI + startAngle;
          angle += angleStep
        ) {
          const starX =
            p.random(0, size) +
            p.cos(angle) * radius * p.noise(angle * time) * 2;
          const starY =
            p.random(0, size) +
            p.sin(angle) * radius * p.noise(angle * time) * 2;
          p.vertex(starX, starY);
        }
        p.endShape(p.CLOSE);
      }
    };

    // draw the grid
    for (let x = 0; x < p.width; x += tileSize) {
      for (let y = 0; y < p.height; y += tileSize) {
        // draw the tile
        p.push();
        p.translate(x, y);
        drawTile(tileSize);
        p.pop();
      }
    }

    time += 1;
  };
};

new p5(sketch);
