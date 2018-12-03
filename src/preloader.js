import './styl/preloader.styl';

import Wukong from 'wukong/wukong';

/* global BASE_PATH */

const wukong = new Wukong({
  loading: '#loading',
  progress: '#progress',
});

const assets = [
  [
    '//unpkg.com/director@1.2.8/build/director.min.js',
    {
      src: './img/bg.jpg',
      onload(event) {
        document.body.style.backgroundImage = 'url(./img/bg.jpg)';
      },
    }
  ],
];

wukong.load(assets);
