import './styl/preloader.styl';

import Wukong from 'wukong/wukong';

/* global BASE_PATH */

const wukong = new Wukong({
  loading: '#loading',
  progress: '#progress',
});

const link = document.getElementsByTagName('link')[0];
const href = link.href;
const hash = href.substring(href.indexOf('.') + 1, href.lastIndexOf('.'));

const assets = [
  [
    '//cdn.staticfile.org/Director/1.2.8/director.min.js',
    {
      src: './img/bg.jpg',
      onload(event) {
        document.body.style.backgroundImage = 'url(./img/bg.jpg)';
      },
    },
    {
      id: 'slogan',
      src: './img/slogan.png',
    },
    {
      id: 'monster',
      src: './img/monster.png',
    },
    {
      id: 'btn',
      src: './img/btn.png',
    },
    {
      id: 'bg2',
      src: './img/bg2.png',
    },
    {
      id: 'result-1',
      src: './img/result1.png',
    },
    `./main.${hash}.css`,
    `./main.${hash}.js`,
  ],
];

wukong.load(assets);
