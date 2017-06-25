/**
 * Created by meathill on 2017/6/25.
 */
import $ from 'sizzle';
import {next} from '../helper/next';
import { navTemplate } from '../component/template';

export default class Homepage {
  constructor(queue) {
    this.queue = queue;
    this.createElement();
    this.delegateEvent();
  }

  createElement() {
    let el = this.el = document.createElement('div');
    el.id = 'homepage';
    el.className = 'container enter';
    document.body.appendChild(el);

    el = this.cover = document.createElement('div');
    el.className = 'cover';
    this.el.appendChild(el);
    let wukong = $('.in')[0];
    wukong.className = 'wukong';
    wukong = el.appendChild(wukong);
    let offset = document.body.clientHeight * .371; //50%-12.9%
    wukong.style.transform = `translate3d(0,${offset}px,0)`;
    let loading = $('#loading')[0];
    loading.classList.add('out');
    this.actions = next(loading)
      .then(() => {
        el.classList.remove('enter');
      })
      .then(() => {
        wukong.classList.add('in');
        wukong.style.transform = 'translate3d(0,0,0)';
        return next(wukong);
      })
      .then(() => {
        let bufu = this.queue.getResult('bufu');
        bufu.className = 'bufu fadeInUp animated';
        el.appendChild(bufu);
        return next(bufu);
      })
      .then(() => {
        let faxing = this.queue.getResult('faxing');
        faxing.className = 'faxing fadeInUp animated';
        el.appendChild(faxing);
        return next(faxing);
      })
      .then(() => {
        let bg = this.queue.getResult('homepage');
        bg.className = 'bg fadeIn animated';
        el.insertBefore(bg, el.firstChild);
        return next(bg);
      });
    this.actions
      .then(() => {
        let up = document.createElement('footer');
        up.innerHTML = '<i class="fa fa-chevron-up fadeInUp animated infinite hinge"></i>';
        el.appendChild(up);
      })
      .then(() => {
        let nav = this.nav = document.createElement('div');
        let blob = this.queue.getResult('nav', true);
        let url = URL.createObjectURL(blob);
        nav.className = 'nav backdrop';
        nav.style.backgroundImage = `url(${url})`;
        nav.innerHTML = navTemplate;
        this.el.insertBefore(nav, el);
        let links = $('a', nav);
        for (let i = 0, len = links.length; i < len; i++) {
          links[i].appendChild(this.queue.getResult(`link${i + 1}`));
        }
      });
  }

  delegateEvent() {
    this.cover.addEventListener('touchstart', this.onTouchStart.bind(this), false);
    this.cover.addEventListener('click', event => {
      if (event.target.tagName.toLowerCase() === 'div') {
        return;
      }
      this.cover.classList.add('slideUp');
      next(this.cover)
        .then(() => {
          this.cover.classList.add('hide');
          this.nav.classList.remove('backdrop');
        });
    }, false);
  }

  onTouchStart(event) {
    let self = this;
    let y = event.touches[0].screenY;
    let offset = 0;
    function onTouchMove(event) {
      let newY = event.touches[0].screenY;
      offset = newY >= y ? 0 : (y - newY);
      self.cover.style.transform = `translate3d(0,-${offset}px,0)`;
    }
    this.el.addEventListener('touchmove', onTouchMove, false);
    this.el.addEventListener('touchend', function onTouchEnd() {
      if (offset > document.body.clientHeight / 4) {
        self.cover.style.transform = 'translate3d(0,-100%,0)';
        self.cover.classList.add('slideUp');
        next(self.cover)
          .then(() => {
            self.cover.style.transform = '';
            self.cover.classList.add('hide');
            self.nav.classList.remove('backdrop');
          });
      } else {
        self.cover.style.transform = '';
      }
      self.el.removeEventListener('touchmove', onTouchMove);
      self.el.removeEventListener('touchend', onTouchEnd);
    }, false);
  }
}