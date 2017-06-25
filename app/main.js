/**
 * Created by meathill on 2017/6/23.
 */

import page from 'page';
import $ from 'sizzle';
import Player from './component/player';
import Homepage from './view/homepage';
import {next, sleep} from './helper/next';

class App {
  constructor(queue) {
    this.queue = queue;
    this.pages = {};
    this.createRouter();
    this.delegateEvent();
    this.showHomepage();

  }

  createRouter() {
    page('/', this.homepage);
    page();
  }

  delegateEvent() {
    document.body.addEventListener('transitionend', this.onTransitionEnd, false);
  }

  homepage() {

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
      });
  }
}

window.App = App;