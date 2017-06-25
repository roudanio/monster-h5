/**
 * Created by meathill on 2017/6/23.
 */

import $ from 'sizzle';
import Player from './component/player';
import Homepage from './view/homepage';
import Clouds from './view/clouds';
import * as template from './component/template';
import {sleep} from './helper/next';

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
    let html = name === 'video' ? template.video : template.page;
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
      $('video', page)[0].poster = url;
    }
    return page;
  }

  getResourceURL(name) {
    let blob = this.queue.getResult(name, true);
    return URL.createObjectURL(blob);
  }

  createRouter() {
    let router = Router({
      '/:page': this.toPage.bind(this)
    });
    router.init('/home');
  }

  delegateEvent() {
    document.body.addEventListener('transitionend', this.onTransitionEnd, false);
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

  toPage(page) {
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

  onTransitionEnd(event) {
    let target = event.target;
    if (target.classList.contains('container') && target.classList.contains('out')) {
      target.classList.add('hide');
    }
  }

  showHomepage() {
    let homepage = this.pages['homepage'] = new Homepage(this.queue);
    homepage.actions
      .then(() => {
        this.player = new Player();
      })
      .then(() => {
        this.clouds = new Clouds(this.queue);
      });
  }
}

window.App = App;