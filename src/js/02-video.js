
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);



const STORAGE_KEY = "videoplayer-current-time";
 
player.on('timeupdate', throttle(function (data) {
    let currentTime = data.seconds;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTime));
}, 1000));
    

player.setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_KEY)))
    .catch(function (error) {
    switch (error.name) {
        case 'RangeError':
             break;

        default:
             break;
    }
});

   
