import Base from 'wukong/View.abstract';

export default class Result extends Base {
  constructor(el, queue) {
    super(el, queue, {
      id: 'result',
      className: 'result container',
    });
  }

  createElement(options) {
    const el = super.createElement(options);

    const result = this.queue.getResult('result-1');
    result.className = 'result fadeIn animated';
    el.appendChild(result);

    const div = document.createElement('div');
    div.className = 'btn-group';
    el.appendChild(div);

    const redo = this.createButton('再测一次', div);
    const buy = this.createButton('怪兽轰趴', div);
    const share = this.createButton('呼叫同伴', div);

    return el;
  }

  createButton(label, div) {
    const btn = document.createElement('button');
    btn.innerText = label;
    btn.className = 'result-button';
    div.appendChild(btn);
  }
}
