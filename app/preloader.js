/**
 * Created by meathill on 2017/6/24.
 */

import Player from './component/player';
import {embedScript} from './helper/util';

/* global BASE_PATH,isWeixin */
/**
 * 开始加载资源
 */
function onFileLoaded(event) {
  let item = event.item;
  if (item.id === 'wukong') {
    let child = loading.getElementsByTagName('footer')[0].appendChild(event.result);
    setTimeout(() => {
      let blob = queue.getResult('wukong', true);
      let url = URL.createObjectURL(blob);
      bar.style.backgroundSize = `${child.clientWidth}px`;
      child.className = 'in';
      child.addEventListener('transitionend', () => {
        bar.style.backgroundImage = `url(${url})`;
        preloaderReady = true;
      }, false);
    }, 50);
  }
}
function onProgress(event) {
  console.log(event.progress);
  if (!preloaderReady) {
    return;
  }
  bar.style.width = `${event.progress * 77.3333334}%`;
}
function start() {
  queue = new createjs.LoadQueue(true, BASE_PATH);
  queue.on('fileload', onFileLoaded);
  queue.on('progress', onProgress);
  queue.on('complete', showHomepage);
  queue.loadFile({
    id: 'wukong',
    src: './img/wukong.png'
  });
  queue.loadManifest([
    '//cdn.staticfile.org/Director/1.2.8/director.min.js',
    {
      id: 'homepage',
      src: './img/homepage.jpg'
    },
    {
      id: 'faxing',
      src: './img/faxing.png'
    },
    {
      id: 'bufu',
      src: './img/bufu.png'
    },
    {
      id: 'js',
      src: './dist/main.js'
    },
    {
      id: 'css',
      src: './css/screen.css'
    },
    {
      id: 'nav',
      src: './img/nav.jpg'
    },
    {
      id: 'links',
      src: './img/nav.png'
    },
    {
      id: 'about',
      src: './img/about.jpg'
    },
    {
      id: 'chupin',
      src: './img/chupin.jpg'
    },
    {
      id: 'intro',
      src: './img/intro.jpg'
    },
    {
      id: 'zhuchuang',
      src: './img/zhuchuang.jpg'
    },
    {
      id: 'price',
      src: './img/price.jpg'
    },
    {
      id: 'video',
      src: './img/video.jpg'
    },
    {
      id: 'back-button',
      src: './img/back-button.png'
    },
    {
      id: 'cloud1',
      src: './img/cloud1.png'
    },
    {
      id: 'cloud2',
      src: './img/cloud2.png'
    },
    {
      id: 'cloud3',
      src: './img/cloud3.png'
    },
    {
      id: 'cloud4',
      src: './img/cloud4.png'
    },
    {
      id: 'cloud5',
      src: './img/cloud5.png'
    },
    {
      id: 'poster',
      src: './img/poster.jpg'
    }
  ]);
}
function showHomepage() {
  console.log('homepage');
  bar.style.width = '77.3333334%';
  let app;
  let interval = setInterval(() => {
    if (preloaderReady) {
      clearInterval(interval);
      app = new App(queue);

      if (!isWeixin) {
        autoPlayMusic();
      }
    }
  }, 1000);
}

let queue;
let preloaderReady = false;
let loading = document.getElementById('loading');
let bar = loading.getElementsByClassName('bar')[0];
let player = new Player();
// 加载 preloadjs
embedScript('//code.createjs.com/createjs-2015.11.26.min.js', () => {
  if ('Promise' in window && window['Promise'] instanceof Function) {
    start();
  } else {
    embedScript('//cdn.staticfile.org/bluebird/3.5.0/bluebird.min.js', start);
  }
});