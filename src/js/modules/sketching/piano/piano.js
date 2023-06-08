import gsap from 'gsap';

export default class Piano {
  constructor() {
    const textEls = /** @type {Array<HTMLParagraphElement>} */ (
      Array.from(document.querySelectorAll('[data-text] p'))
    );

    // for each text el
    textEls?.forEach((textEl, _index) => {
      const text = textEl.textContent;
      if (!text) {
        return;
      }
      const splitText = text.split('').join('</span><span aria-hidden="true">');
      textEl.innerHTML = `<span aria-hidden="true">${splitText}</span>`;

      const letters = textEl.querySelectorAll('span');

      gsap.fromTo(
        letters,
        {
          alpha: 0,
          y: 10,
        },
        {
          alpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'sine.out',
          stagger: 0.1,
        }
      );

      // randomly change opacity of each letter
      gsap.to(letters, {
        duration: 0.1,
        // ease: 'sine.out',
        repeat: -1,

        // rotate on random angle between -5 and 5
        rotation: () => gsap.utils.random(-5, 5),

        yoyo: true,
        stagger: 0.5,
        // recalculate the function every 0.3 seconds
        repeatRefresh: true,
      });

      letters.forEach((letter) => {
        // on mouse enter scale up for each letter
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, {
            scale: 1.2,
            duration: 0.05,
            ease: 'sine.out',
          });
        });

        // on mouse leave scale down for each letter
        letter.addEventListener('mouseleave', () => {
          gsap.to(letter, {
            scale: 1,
            duration: 0.05,
            ease: 'sine.out',
          });
        });
      });
    });
  }
}
