/**
 * Created by meathill on 2017/6/25.
 */
import $ from 'sizzle';
import {next, sleep} from '../helper/next';

export default class Clouds {
  constructor(queue) {
    this.el = $('#clouds')[0];
    for (let i = 0; i < 5; i++) {
      let image = queue.getResult(`cloud${i + 1}`);
      this.el.appendChild(image);
    }
  }

  show() {
    this.el.classList.remove('hide');
    let p = Promise.resolve();
    for (let i = 0; i < 5; i++) {
      p = p.then(() => {
        this.el.children[i].classList.add('show');
      })
        .then(() => {
          return sleep(.2);
        });
    }
    p
      .then(() => {
        return sleep(.6);
      })
      .then(() => {
        this.el.classList.add('out');

        return next(this.el);
      })
      .then(() => {
        this.el.classList.add('hide');
        this.el.classList.remove('out');
        for (let i = 0; i < 5; i++) {
          this.el.children[i].classList.remove('show');
        }
      });
  }
}