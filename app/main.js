/**
 * Created by meathill on 2017/6/23.
 */

import {Router} from 'director';
import $ from 'sizzle';
import Player from './component/player';
import Homepage from './view/homepage';
import * as template from './component/template';
import {next, sleep} from './helper/next';

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
    let blob = this.queue.getResult(name, true);
    let url = URL.createObjectURL(blob);
    page.style.backgroundImage = `url(${url})`;
    page = document.body.appendChild(page);
    blob = this.queue.getResult('back-button', true);
    url = URL.createObjectURL(blob);
    let image = document.createElement('img');
    image.src = url;
    $('.back-button', page)[0].appendChild(image);
    return page;
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
    debugger;
    $('.page:not(.hide)')[0].classList.add('out');
  }

  toPage(page) {
    if (!page || page === 'home') {
      this.homepage();
      return;
    }
    let el = this.pages[page] || this.createPage(page);
    this.pages[page] = el;
    el.classList.remove('out');
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