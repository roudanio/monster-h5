/**
 * Created by meathill on 2017/6/24.
 */

import Player from './component/player';
import {embedScript} from './helper/util';

/* global BASE_PATH */
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
  } else if (item.id === 'music') {
    this.player = new Player();
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
  let query = location.search;
  let mp3 = query ? 'daiquan' : 'qitian';
  queue = new createjs.LoadQueue(true, BASE_PATH);
  queue.installPlugin(createjs.Sound);
  queue.on('fileload', onFileLoaded);
  queue.on('progress', onProgress);
  queue.on('complete', showHomepage);
  queue.loadFile({
    id: 'wukong',
    src: './img/wukong.png'
  });
  queue.loadFile({
    id: 'music',
    src: `./audio/${mp3}.mp3`
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
      id: 'link1',
      src: './img/link1.png'
    },
    {
      id: 'link2',
      src: './img/link2.png'
    },
    {
      id: 'link3',
      src: './img/link3.png'
    },
    {
      id: 'link4',
      src: './img/link4.png'
    },
    {
      id: 'link5',
      src: './img/link5.png'
    },
    {
      id: 'link6',
      src: './img/link6.png'
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
    }
  }, 1000);
}

let queue;
let preloaderReady = false;
let loading = document.getElementById('loading');
let bar = loading.getElementsByClassName('bar')[0];
// 加载 preloadjs
embedScript('//code.createjs.com/createjs-2015.11.26.min.js', () => {
  let event = new TouchEvent('touchstart');
  document.body.dispatchEvent(event);
  event = new TouchEvent('touchend');
  document.body.dispatchEvent(event);
  if ('Promise' in window && window['Promise'] instanceof Function) {
    start();
  } else {
    embedScript('//cdn.staticfile.org/bluebird/3.5.0/bluebird.min.js', start);
  }
});