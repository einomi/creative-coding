class Worm {
  /** @param {import('p5')} p
   * @param {number} size
   * @param {number} x
   * @param {number} y
   *  */
  constructor(p, size, x, y, color) {
    this.p = p;
    this.size = size;
    this.x = x;
    this.y = y;
    this.xSpeed = 1;
    this.ySpeed = 1;
    this.color = color;
  }

  draw() {
    const p = this.p;

    p.beginShape();
    p.stroke(this.color, this.p.random(5, 70), this.p.random(5, 100), 100);
    p.strokeWeight(this.size);
    p.strokeCap(this.p.ROUND);
    p.rotate(this.p.radians(this.p.random(0, 360)));
    p.noFill();
    p.vertex(this.x, this.y);

    p.bezierVertex(
      this.x + p.random(50, 100),
      this.y - p.random(50, 100),
      this.x + p.random(50, 100),
      this.y + p.random(150, 200),
      this.x + p.random(150, 200),
      this.y
    );
    p.endShape();
  }
}

export default Worm;
