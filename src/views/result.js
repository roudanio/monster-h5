import Base from 'wukong/View.abstract';

export default class Result extends Base {
  createElement(options) {
    const el = super.createElement(options);

    const result = this.queue.getResult('result-1');
    result.className = 'result fadeIn animated';
    el.appendChild(result);

    const div = document.createElement('div');
    div.className = 'btn-group';
    el.appendChild(div);

    const redo = this.createButton('再测一次', div, 'select');
    const buy = this.createButton('怪兽轰趴', div, 'http://blog.meathill.com');
    const share = this.createButton('呼叫同伴', div);

    return el;
  }

  createButton(label, div, link) {
    const btn = document.createElement(link ? 'a' : 'button');
    btn.innerText = label;
    if (link) {
      btn.href = link;
    }
    btn.className = 'result-button';
    div.appendChild(btn);
  }
}
