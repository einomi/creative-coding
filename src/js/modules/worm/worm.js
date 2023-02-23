import Brush from '../brush/brush';

class Worm {
  /** @param {import('p5')} p
   * @param {number} x
   * @param {number} y
   * @param {import('p5').Color} color
   *  */
  constructor(p, x, y, color) {
    this.p = p;
    this.size = p.random(5, 25);
    this.x = x;
    this.y = y;
    this.xSpeed = 1;
    this.ySpeed = 1;
    this.color = color;
    this.pointsCount = 200;
    /** @type {{ size: number; growDirection: -1 | 1 }[]} */
    this.points = [];

    this.brush = new Brush(p, this.size, color, 100);

    this.init();

    this.draw();
  }

  generateNewSize() {
    return this.p.random(this.minSize, this.maxSize);
  }

  generatePointSizes() {
    const p = this.p;
    for (let i = 0; i < this.pointsCount; i += 1) {
      const size = this.generateNewSize();
      this.points.push({
        size,
        growDirection: p.random() > 0.5 ? 1 : -1,
      });
    }
    return this.pointSizes;
  }

  init() {
    const p = this.p;

    this.x1 = this.x;
    this.y1 = this.y;
    this.x2 = this.x + p.random(25, 50);
    this.y2 = this.y - p.random(25, 50);
    this.x3 = this.x + p.random(0, 100);
    this.y3 = this.y + p.random(0, 100);
    this.x4 = this.x + p.random(50);
    this.y4 = this.y + p.random(50);

    this.angle = this.p.random(0, 360);

    this.minSize = 1;
    this.maxSize = 5;

    this.generatePointSizes();
  }

  draw() {
    const p = this.p;

    p.push();

    p.translate(this.x, this.y);

    p.rotate(this.p.radians(this.angle));
    p.noStroke();
    p.noFill();

    p.bezier(
      this.x1,
      this.y1,
      this.x2,
      this.y2,
      this.x3,
      this.y3,
      this.x4,
      this.y4
    );

    this.points.forEach(({ size, growDirection }, i) => {
      const t = i / this.pointsCount;
      const x = p.bezierPoint(this.x1, this.x2, this.x3, this.x4, t);
      const y = p.bezierPoint(this.y1, this.y2, this.y3, this.y4, t);

      let newSize = size;
      let newGrowDirection = growDirection;

      const growSize = 0.1;

      // if size > max size switch grow direction and decrease size
      if (growDirection > 0) {
        if (size > this.maxSize) {
          newSize = size - growSize;
          newGrowDirection = -1;
        } else {
          newSize = size + growSize;
        }
      } else if (size < this.minSize) {
        newSize = size + growSize;
        newGrowDirection = 1;
      } else {
        newSize = size - growSize;
      }

      this.points[i] = {
        size: newSize,
        growDirection: newGrowDirection,
      };
      p.fill(this.color);
      p.circle(x, y, Math.abs(newSize));
    });

    p.pop();
  }
}

export default Worm;
