import Brush from '../brush/brush';

class Worm {
  /** @param {import('p5')} p
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {import('p5').Color} color
   *  */
  constructor(p, size, x, y, color) {
    this.p = p;
    this.size = size;
    this.x = x;
    this.y = y;
    this.xSpeed = 1;
    this.ySpeed = 1;
    this.color = color;

    this.brush = new Brush(p, size, color, 100);

    this.init();

    this.draw();
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

    const steps = 200;

    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = p.bezierPoint(this.x1, this.x2, this.x3, this.x4, t);
      const y = p.bezierPoint(this.y1, this.y2, this.y3, this.y4, t);
      p.fill(this.color);
      p.circle(x, y, p.random(1, p.random(0, this.size)));
    }

    p.pop();
  }
}

export default Worm;
