import Vue from 'vue';

const swipe = Vue.directive('swipe', {
  bind: (el: HTMLElement, binding: any) => {
    let startingPosition: number = 0;
    let currentPosition: number = 0;
    let endPosition: number = 0;
    let difference: number = 0;
    const bottomOffset: number = 50;
    const elementStartingPosition: number = window.innerHeight - bottomOffset;

    let touchStartTime: number = 0;
    let touchEndTime: number = 0;

    // eslint-disable-next-line no-param-reassign
    el.style.top = `${elementStartingPosition}px`;

    el.addEventListener('click', ($event: Event) => {
      startingPosition = 0;
      // eslint-disable-next-line no-param-reassign
      el.style.transition = 'top 1s ease-in-out';
      // eslint-disable-next-line no-param-reassign
      el.style.top = '0px';
    });

    el.addEventListener('touchend', ($event: TouchEvent) => {
      $event.preventDefault();
      touchEndTime = new Date().getTime();

      // eslint-disable-next-line no-param-reassign
      el.style.transition = 'top 1s ease-in-out';
      if (touchEndTime - touchStartTime < 150) {
        if (endPosition < startingPosition) {
          // eslint-disable-next-line no-param-reassign
          el.style.top = '0px';
        } else if (endPosition > startingPosition) {
          // eslint-disable-next-line no-param-reassign
          el.style.top = `${elementStartingPosition}px`;
        }
      }
    });

    el.addEventListener('touchstart', ($event: TouchEvent) => {
      touchStartTime = new Date().getTime();
      // eslint-disable-next-line no-param-reassign
      el.style.transition = '';
      startingPosition = $event.touches[0].clientY;
    }, {
      passive: false
    });

    el.addEventListener('touchmove', ($event: TouchEvent) => {
      $event.preventDefault();
      endPosition = $event.touches[0].clientY;
      difference = currentPosition - endPosition;
      currentPosition = $event.touches[0].clientY;
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
