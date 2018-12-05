import Base from 'wukong/View.abstract';

const question = [
  {
    q: '假如你穿越到古代，路遇武林门派激情混战，你会怎么做？',
    options: [
      '三十六计走为上，跑就对了',
      '静观其变，万一有钱可捡呢',
      '路见不平绝对不怂，打架带我一份',
      '看热闹不嫌事大，love&peace',
    ]
  },
];

export default class Select extends Base {
  constructor(el, queue) {
    super(el, queue, {
      id: 'select',
      className: 'container select',
    });
  }

  createElement(options) {
    const el = super.createElement(options);

    const header = document.createElement('header');
    const monster = this.queue.getResult('monster');
    monster.className = 'monster';
    header.appendChild(monster);
    header.className = 'form-header animated slideInDown faster';
    const slogan = this.queue.getResult('slogan');
    slogan.className = 'slogan';
    header.appendChild(slogan);
    el.appendChild(header);

    const select = this.select = this.createSelect();
    el.appendChild(select);

    const bgUrl = this.getAssetUrl('bg2');
    el.style.backgroundImage = `url(${bgUrl})`;

    return el;
  }

  delegateEvents() {
    super.delegateEvents();
    this.el.addEventListener('click', event => {
      const {target} = event;
      if (target.tagName.toLowerCase() === 'button') {
        this.emit('select', target.dataset.index);
      }
    }, false);
  }

  createSelect() {
    const container = document.createElement('div');
    container.className = 'select-container';

    const [{q, options}] = question;
    const label = document.createElement('p');
    label.className = 'form-label animated tada';
    label.innerText = q;
    container.appendChild(label);

    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'form-option animated fadeInDown';
      button.innerText = option;
      button.dataset.index = index;
      container.appendChild(button);
    });

    return container;
  }
}
