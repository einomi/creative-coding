// @ts-ignore
import random from 'canvas-sketch-util/random';

/** @typedef Params
 * @property {number} x
 * @property {number} y
 * @property {{x: number; y: number}} cursor
 * @property {CanvasRenderingContext2D} context
 * @property {Function} onAudioPlay
 *  */

class Bird {
  /** @param {Params} params */
  constructor({ x, y, context, cursor, onAudioPlay }) {
    this.context = context;
    this.cursor = cursor;
    this.onAudioPlay = onAudioPlay;

    // const x = random.range(width * 0.2, width * 0.8);
    // const y = random.range(height * 0.2, height * 0.8);

    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;

    // acceleration
    this.ax = 0;
    this.ay = 0;

    // velocity
    this.vx = 0;
    this.vy = 0;

    this.minDist = 200;
    this.pushFactor = random.range(0.05, 0.08);
    this.pullFactor = random.range(0.01, 0.02);
    this.dampFactor = random.range(0.9, 0.95);
  }

  drawWingStart() {
    this.context.strokeStyle = '#dedede';
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.translate(this.x, this.y);
    this.context.lineWidth = 2;
  }

  drawWingEnd() {
    this.context.stroke();
    this.context.restore();
  }

  drawLeftWing() {
    this.drawWingStart();
    this.context.lineTo(random.range(-20, -10), random.range(-40, -50));
    this.drawWingEnd();
  }

  drawRightWing() {
    this.drawWingStart();
    this.context.lineTo(random.range(10, 40), random.range(-20, -10));
    this.drawWingEnd();
  }

  update() {
    // pull force
    let dx = this.initialX - this.x;
    let dy = this.initialY - this.y;
    let dd = Math.sqrt(dx * dx + dy * dy);

    this.ax = dx * this.pullFactor;
    this.ay = dy * this.pullFactor;

    // push force
    dx = this.x - this.cursor.x;
    dy = this.y - this.cursor.y;
    dd = Math.sqrt(dx * dx + dy * dy);

    const distDelta = this.minDist - dd;

    if (dd < this.minDist) {
      this.onAudioPlay();
      this.ax += (dx / dd) * distDelta * this.pushFactor;
      this.ay += (dy / dd) * distDelta * this.pushFactor;
    }

    this.vx += this.ax;
    this.vy += this.ay;

    this.vx *= this.dampFactor;
    this.vy *= this.dampFactor;

    this.x += this.vx;
    this.y += this.vy;

    this.drawLeftWing();
    this.drawRightWing();
  }
}

export default Bird;
