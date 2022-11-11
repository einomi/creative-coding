// @ts-ignore
import canvasSketch from 'canvas-sketch';
// @ts-ignore
import random from 'canvas-sketch-util/random';

import Bird from './bird';
import { createAudio } from './audio';

const audioEl = createAudio();

let isPlaying = false;
/** @type {Timer} */
let intervalId;

function fadeVolume(isOut = false) {
  clearInterval(intervalId);
  audioEl.volume = isOut ? 1 : 0;
  intervalId = setInterval(() => {
    audioEl.volume = Number(
      (isOut ? audioEl.volume - 0.05 : audioEl.volume + 0.05).toFixed(2)
    );
    if (audioEl.volume === (isOut ? 0 : 1)) {
      clearInterval(intervalId);
    }
  }, 20);
}

function play() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  if (audioEl.paused) {
    audioEl.play();
  }
  fadeVolume();
}

function pause() {
  if (!isPlaying) {
    return;
  }
  isPlaying = false;
  fadeVolume(true);
}

const settings = {
  dimensions: [window.innerWidth, window.innerHeight],
  styleCanvas: false,
  playbackRate: 'throttle',
  animate: true,
  fps: 20,
  duration: 100,
};

/** @typedef SketchProps
 * @property {CanvasRenderingContext2D} context
 * @property {HTMLCanvasElement} canvas
 * @property {number} width
 * @property {number} height
 *  */

/** @param {SketchProps} args */
function sketch({ context, canvas, width, height }) {
  const cursor = { x: 9999, y: 9999 };

  canvas.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseleave', () => {
    pause();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pause();
    }
  });

  /** @param {MouseEvent} event */
  function onMouseMove(event) {
    const x = (event.offsetX / canvas.offsetWidth) * canvas.width;
    const y = (event.offsetY / canvas.offsetHeight) * canvas.height;

    cursor.x = x;
    cursor.y = y;

    if (
      x > (canvas.offsetWidth - canvas.offsetHeight) / 2 &&
      x < (canvas.offsetWidth - canvas.offsetHeight) / 2 + canvas.offsetHeight
    ) {
      play();
    } else {
      pause();
    }
  }

  /** @type {Bird[]} */
  const birds = [];

  const circlesCount = 6;
  const birdSize = 40;
  let circleRadius = 27;
  const fitRadius = birdSize;

  // eslint-disable-next-line id-length
  for (let i = 0; i < circlesCount; i += 1) {
    const circumference = Math.PI * 2 * circleRadius;
    const numFit = i ? Math.floor(circumference / (fitRadius * 2)) : 1;
    const fitSlice = (Math.PI * 2) / numFit;

    // eslint-disable-next-line id-length
    for (let j = 0; j < numFit; j += 1) {
      if (!random.chance(0.9 - i / circlesCount)) {
        continue;
      }
      const theta = fitSlice * j;

      const x = Math.cos(theta) * circleRadius + width / 2;
      const y = Math.sin(theta) * circleRadius + height / 2;

      birds.push(
        new Bird({
          x,
          y,
          context,
          cursor,
        })
      );
    }

    circleRadius += 90;
  }

  /** @param {SketchProps} args */
  // eslint-disable-next-line no-shadow
  return function render({ context, width, height }) {
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);
    birds.forEach((bird) => bird.update());
  };
}

canvasSketch(sketch, settings);
