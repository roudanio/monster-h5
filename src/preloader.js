import './styl/preloader.styl';
import './styl/main.styl';
import Wukong from 'wukong/wukong';
import Player from 'wukong/player';
import {load, loadCSS} from 'wukong/helper/loader';

/* global BASE_PATH */

const scripts = document.getElementsByTagName('script');
const script = scripts[scripts.length - 1];
let href = script.src;
href = href.substring(href.lastIndexOf('/') + 1);
const hash = href.substring(href.indexOf('.') + 1, href.lastIndexOf('.'));

const wukong = new Wukong({
  loading: '#loading',
  progress: '#progress',
});

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
      id: 'music',
      src: './audio/bg.mp3',
    },
    {
      id: 'gutianle',
      src: './img/gutianle.png',
    },
    {
      id: 'zhoudongyu',
      src: './img/zhoudongyu.png',
    },
    {
      id: 'chenxuedong',
      src: './img/chenxuedong.png',
    },
    {
      id: 'guobiting',
      src: './img/guobiting.png',
    },
    {
      id: 'btn1',
      src: './img/btn1.png',
    },
    {
      id: 'btn2',
      src: './img/btn2.png',
    },
    {
      id: 'btn3',
      src: './img/btn3.png',
    },
    {
      id: 'share',
      src: './img/share.png',
    },
    `./main.${hash}.js`,
  ],
];

// 未防止阻塞渲染
loadCSS('https://use.fontawesome.com/releases/v5.5.0/css/solid.css');
loadCSS('https://use.fontawesome.com/releases/v5.5.0/css/fontawesome.css');
load('https://res2.wx.qq.com/open/js/jweixin-1.4.0.js')
  .then(() => {
    return load('http://weixin.meathill.com/?url=http://kungfumonster.meathill.com/')
  })
  .then(() => {
    wx.ready(function () {
      wx.updateTimelineShareData({
        title: '武林怪兽-快测测你体内的怪兽DNA！', // 分享标题
        link: 'http://kungfumonster.meathill.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://kungfumonster.meathill.com/img/logo.png', // 分享图标
        success: function () {
          // 设置成功
          console.log('set share link ok');
        },
      });
      wx.updateAppMessageShareData({
        title: '武林怪兽', // 分享标题
        desc: '快测测你体内的怪兽DNA！', // 分享描述
        link: 'http://kungfumonster.meathill.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://kungfumonster.meathill.com/img/logo.jpg', // 分享图标
        success: function () {
          // 设置成功
          console.log('set share link ok');
        },
      });
    });
  });

wukong.load(assets);
new Player();
