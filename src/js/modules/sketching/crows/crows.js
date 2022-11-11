// @ts-ignore
import canvasSketch from 'canvas-sketch';
// @ts-ignore
import random from 'canvas-sketch-util/random';

import Bird from './bird';
import { createAudio } from './audio';

const audioEl = createAudio();

let isPlaying = false;

/** @type {any[]} */
const timeouts = [];

function fadeVolume(out = false) {
  timeouts.forEach((id) => {
    clearTimeout(id);
  });
  audioEl.volume = out ? 1 : 0;
  new Array(100).fill(null).forEach((_, index) => {
    const timeoutId = setTimeout(() => {
      audioEl.volume = (out ? 99 - index : index) / 100;
    }, 50);
    timeouts.push(timeoutId);
  });
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

function onAudioPlay() {
  // play();
}

const settings = {
  dimensions: [1080, 1080],
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

  canvas.addEventListener('mouseenter', () => {
    play();
  });

  canvas.addEventListener('mouseleave', () => {
    pause();
  });

  /** @param {MouseEvent} event */
  function onMouseMove(event) {
    const x = (event.offsetX / canvas.offsetWidth) * canvas.width;
    const y = (event.offsetY / canvas.offsetHeight) * canvas.height;

    cursor.x = x;
    cursor.y = y;
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
          onAudioPlay,
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
