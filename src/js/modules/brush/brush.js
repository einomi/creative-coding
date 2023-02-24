/**
 * @typedef BrushType
 * @property {import('p5')} p
 * @property {number} weight
 * @property {import('p5').Color} color
 * @property {number} alpha
 *  */

/** @type {BrushType} */
class Brush {
  /** @param {import('p5')} p */
  constructor(p) {
    this.p = p;
    this.weight = p.random(5, 50);
    this.dynamicWeight = 0;
    this.color = p.color(0);
    this.alpha = 1;
  }

  /** @param {number} weight */
  setWeight(weight) {
    this.dynamicWeight = weight;
  }

  /** @param {import('p5').Color} color */
  setColor(color) {
    this.color = color;
    this.p.stroke(this.color);
  }

  /** @param {number} alpha */
  setAlpha(alpha) {
    this.alpha = alpha;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  draw(x, y) {
    this.p.stroke(this.color);
    this.p.fill(this.color);
    this.p.ellipse(x, y, this.weight, this.weight);
  }

  /**
   * @param {import('p5').Vector} start
   * @param {import('p5').Vector} end
   *  */
  makeStroke(start, end) {
    const p = this.p;
    p.push();

    const distance = start.dist(end);
    const direction = end.copy().sub(start).normalize();
    const normal = direction.copy().rotate(p.HALF_PI);
    const offset = normal.copy().mult(this.weight / 2);
    const step = 0.5;
    const steps = distance / step;
    const halfSteps = steps / 2;

    this.dynamicWeight = 0;

    for (let i = 0; i < steps; i += 1) {
      if (i < halfSteps) {
        this.dynamicWeight = (this.weight * i) / steps;
      } else {
        this.dynamicWeight = this.weight - (this.weight * i) / steps;
      }
      p.fill(this.color);
      p.stroke(this.color);
      // this.setColor(
      //   p.color(
      //     p.hue(this.color),
      //     p.saturation(this.color),
      //     p.brightness(this.color)
      //   )
      // );
      p.circle(start.x + offset.x, start.y + offset.y, this.dynamicWeight);

      start.add(direction.copy().mult(step));
    }

    p.pop();
  }
}

export default Brush;
