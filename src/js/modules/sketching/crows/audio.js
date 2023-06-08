export function createAudio() {
  const audioEl = document.createElement('audio');
  audioEl.preload = 'auto';
  audioEl.src = '/crows.mp3';
  audioEl.loop = true;
  audioEl.volume = 0;
  const enterContainer = document.querySelector('[data-enter]');
  const enterButton = /** @type {HTMLButtonElement} */ (
    document.querySelector('[data-enter-button]')
  );
  enterButton.addEventListener('click', () => {
    enterContainer?.remove();
  });

  document.body.appendChild(audioEl);

  return audioEl;
}
