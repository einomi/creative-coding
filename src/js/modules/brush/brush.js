class Brush {
  /**
   * @param {import('p5')} p
   * @param {number} size
   * @param {import('p5').Color} color
   * @param {number} alpha
   * */
  constructor(p, size, color, alpha) {
    this.p = p;
    this.size = size;
    this.color = color;
    this.alpha = alpha;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  draw(x, y) {
    this.p.stroke(this.color);
    this.p.fill(this.color);
    this.p.ellipse(x, y, this.size, this.size);
  }
}

export default Brush;
