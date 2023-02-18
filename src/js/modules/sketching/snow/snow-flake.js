class SnowFlake {
  // @ts-ignore
  constructor({ p, x, y, diameter, speed }) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speed = speed;
    this.draw();
  }

  animateFalling() {
    this.y += this.speed;
    this.x -= this.speed / 10;
    this.draw();
  }

  draw() {
    this.p.fill('#ffffff90');
    this.p.stroke('#ffffff90');
    this.p.circle(this.x, this.y, this.diameter);
  }
}

export default SnowFlake;
