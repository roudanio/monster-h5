import Base from 'wukong/View.abstract';
import {play} from 'wukong/helper/next';

export default class Loading extends Base {
  constructor(el) {
    super(el);
    el.firstElementChild.classList.add('over');
  }

  delegateEvents() {
    const onRemove = () => {
      this.el.remove();
      this.el.removeEventListener('animationend', onRemove);
    };
    this.el.addEventListener('animationend', onRemove, false);
  }

  close() {
    return play(document.getElementById('progress'), 'fadeOutUp');
  }
}
