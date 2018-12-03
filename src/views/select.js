import Base from 'wukong/View.abstract';

export default class Select extends Base {
  constructor(el, queue) {
    super(el, queue);
    this.createElement();
  }

  createElement() {
    this.el.className = 'container select';

  }
}
