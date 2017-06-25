/**
 * Created by meathill on 2017/6/24.
 */

/**
 * 开始加载资源
 */
function load(src, callback) {
  let script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.onload = callback;
  document.body.appendChild(script);
}
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
  bar.style.width = `${event.progress * 82}%`;
}
function start() {
  queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);
  queue.on('fileload', onFileLoaded);
  queue.on('progress', onProgress);
  queue.on('complete', showHomepage);
  queue.loadFile({
    id: 'wukong',
    src: './img/wukong.png'
  });
  queue.loadManifest([
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
    }
  ]);
  queue.loadFile({
    id: 'music',
    src: './audio/qitian.mp3'
  });
}
function showHomepage() {
  console.log('homepage');
  bar.style.width = '82%';
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
load('//code.createjs.com/createjs-2015.11.26.min.js', () => {
  if ('Promise' in window && window['Promise'] instanceof Function) {
    start();
  } else {
    load('//cdn.staticfile.org/bluebird/3.5.0/bluebird.min.js', start);
  }
});