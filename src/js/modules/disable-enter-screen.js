function disableEnterScreen() {
  const enterScreen = /** @type {HTMLElement} */ (
    document.querySelector('[data-enter]')
  );
  enterScreen.remove();
}

disableEnterScreen();
