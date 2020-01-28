import Vue from 'vue';

const swipe = Vue.directive('swipe', {
  bind: (el: HTMLElement, binding: any) => {
    let startingPosition: number = 0;
    let difference: number = 0;
    const bottomOffset: number = 50;
    const elementStartingPosition: number = window.innerHeight - bottomOffset;

    // eslint-disable-next-line no-param-reassign
    el.style.top = `${elementStartingPosition}px`;

    el.addEventListener('click', ($event: Event) => {
      startingPosition = 0;
      // eslint-disable-next-line no-param-reassign
      el.style.transition = 'top 1s ease-in-out';
      // eslint-disable-next-line no-param-reassign
      el.style.top = '0px';
    });

    el.addEventListener('touchstart', ($event: TouchEvent) => {
      // eslint-disable-next-line no-param-reassign
      el.style.transition = '';
      startingPosition = $event.touches[0].clientY;
    }, {
      passive: false
    });

    el.addEventListener('touchmove', ($event: TouchEvent) => {
      $event.preventDefault();
      difference = startingPosition - $event.touches[0].clientY;
      startingPosition = $event.touches[0].clientY;
      const currentTop: number = el.getBoundingClientRect().top;
      const newTopPosition: number = currentTop - difference;

      if (newTopPosition < 0 || newTopPosition > elementStartingPosition) {
        return;
      }
      // eslint-disable-next-line no-param-reassign
      el.style.top = `${newTopPosition}px`;
    }, {
      passive: false
    });
  },
});

export default {
  swipe,
};
