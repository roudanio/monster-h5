/**
 * Created by meathill on 2017/6/23.
 */

import $ from 'sizzle';
import Homepage from './view/homepage';
import Clouds from './view/clouds';
import * as template from './component/template';
import {sleep} from './helper/next';
import {embedScript} from './helper/util';

/* global Router, URL */

class App {
  constructor(queue) {
    this.queue = queue;
    this.pages = {};
    this.createRouter();
    this.delegateEvent();
    this.showHomepage();
  }

  createPage(name) {
    let html = template[name];
    let page = document.createElement('div');
    page.innerHTML = html;
    page.className = `container page out ${name}`;
    let url = this.getResourceURL(name);
    page.style.backgroundImage = `url(${url})`;
    page = document.body.appendChild(page);
    let image = document.createElement('img');
    image.src = this.getResourceURL('back-button');
    $('.back-button', page)[0].appendChild(image);
    if (name === 'video') {
      url = this.getResourceURL('poster');
      let video = $('video', page)[0];
      video.poster = url;
      video.addEventListener('play', () => {
        let event = new CustomEvent('video');
        $('#player').dispatchEvent(event);
      }, false);
    }
    return page;
  }

  getResourceURL(name) {
    let blob = this.queue.getResult(name, true);
    return URL.createObjectURL(blob);
  }

  createRouter() {
    let router = Router({
      '/:page': this.toPage.bind(this),
      '/zhuchuang/:name': this.showHaibao.bind(this)
    });
    router.init('/home');
  }

  delegateEvent() {
    document.body.addEventListener('transitionend', this.onTransitionEnd, false);
    document.body.addEventListener('animationend', this.onAnimationEnd, false);
  }

  homepage() {
    let page = $('.page:not(.hide)')[0];
    if (!page) {
      return;
    }
    this.clouds.show();
    sleep(1)
      .then(() => {
        page.classList.add('out');
      });
  }

  showHaibao(name) {
    let haibao = document.createElement('div');
    haibao.className = 'haibao fadeInUp animated';
    haibao.innerHTML = template.haibao.replace('{{name}}', name);
    let image = this.queue.getResult('back-button');
    $('.back-button', haibao)[0].appendChild(image);
    haibao.addEventListener('click', function onClick() {
      location.hash = '/zhuchuang/';
      haibao.classList.remove('fadeInuUp');
      haibao.classList.add('fadeOutDown');
      haibao.removeEventListener('click', onClick);
    }, false);
    document.body.appendChild(haibao);
  }

  toPage(page) {
    if (page === 'zhuchuang' && $('.zhuchuang.page:not(.hide)').length) {
      return;
    }
    if (!page || page === 'home' || !this.clouds) {
      this.homepage();
      return;
    }
    let el = this.pages[page] || this.createPage(page);
    this.pages[page] = el;
    this.clouds.show();
    sleep(1)
      .then(() => {
        el.classList.remove('hide');
        el.classList.remove('out');
      });
  }

  onAnimationEnd(event) {
    let target = event.target;
    if (event.animationName === 'fadeOutDown') {
      document.body.removeChild(target);
    }
  }

  onTransitionEnd(event) {
    let target = event.target;
    if (target.classList.contains('container') && target.classList.contains('out')) {
      target.classList.add('hide');
    }
  }

  showHomepage() {
    embedScript('http://tajs.qq.com/stats?sId=62752451');
    let homepage = this.pages['homepage'] = new Homepage(this.queue);
    homepage.actions
      .then(() => {
        this.clouds = new Clouds(this.queue);
      });
  }
}

window.App = App;