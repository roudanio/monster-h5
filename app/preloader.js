/**
 * Created by meathill on 2017/6/24.
 */

let queue = new createjs.LoadQueue();
let loading = document.getElementById('loading');
let bar = loading.getElementsByClassName('bar')[0];
queue.installPlugin(createjs.Sound);
queue.on('fileload', onFileLoaded);
queue.on('progress', onProgress);
queue.on('complete', showHomepage);
queue.loadManifest([
  {
    id: 'wukong',
    src: './img/wukong.png'
  }
]);
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
  }
]);

function onFileLoaded(event) {
  let item = event.item;
  if (item.id === 'wukong') {
    let child = loading.getElementsByTagName('footer')[0].appendChild(event.result);
    setTimeout(() => {
      let blob = queue.getResult('wukong', true);
      let url = URL.createObjectURL(blob);
      child.className = 'in';
      child.addEventListener('transitionend', () => {
        bar.style.backgroundImage = `url(${url})`;
      }, false);
    }, 50);
  }
}
function onProgress(event) {
  console.log(event.progress);
  bar.style.width = `${event.progress * 82}%`;
}
function showHomepage() {
  console.log('homepage');
}