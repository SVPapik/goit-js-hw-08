import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(evt => {
    console.log(evt);
    localStorage.setItem(CURRENT_TIME_KEY, evt.seconds);
  }, 2000)
);

player
  .setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY))
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log("This listener wasn't active on this video before");
        break;

      default:
        console.log('Unknown error or Hryhoriy cleared Local Storage history');
        break;
    }
  });
