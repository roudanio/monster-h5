import Base from 'wukong/View.abstract';
import DataBus from '../data/bus';

export default class Result extends Base {
  constructor(el, queue, options) {
    super(el, queue, options);

    this.queue.on('complete', this.onLoadComplete, this);
  }

  createElement(options) {
    const el = super.createElement(options);

    const div = this.buttons = document.createElement('div');
    div.className = 'btn-group';
    el.appendChild(div);

    const redo = this.createButton('btn1', div, '#/select');
    const buy = this.createButton('btn2', div, 'https://h5.m.taopiaopiao.com/app/movie/pages/index/show-detail.html?showid=215417');
    const share = this.createButton('btn3', div);

    return el;
  }

  createButton(label, div, link) {
    const btn = document.createElement(link ? 'a' : 'button');
    const image = this.queue.getResult(label);
    btn.appendChild(image);
    if (link) {
      btn.href = link;
    }
    btn.className = 'result-button';
    div.appendChild(btn);
  }

  enter() {
    const result = Object.assign({}, DataBus.result);
    let total = 0;
    let max = 0;
    let maxKey = 'cute';
    for (let prop in result) {
      const item = result[prop];
      total += item;
      if (item > max) {
        max = item;
        maxKey = prop;
      }
    }
    for (let prop in result) {
      result[prop] = Math.round(result[prop] / total * 100);
    }

    const key = this.key = `result-${maxKey}`;
    const image = this.queue.getResult(key);
    if (!image) {
      this.queue.loadFile({id: key, src: `./img/${key}.png`});
    } else {
      this.showImage(image);
    }
  }

  exit() {
    this.el.removeChild(this.image);
    this.image = null;
  }

  showImage(image) {
    this.image = image;
    image.className = `result-image ${this.key}`;
    this.el.insertBefore(image, this.buttons);
  }

  onLoadComplete() {
    this.showImage(this.queue.getResult(this.key));
  }
}
