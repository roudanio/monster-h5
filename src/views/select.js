import Base from 'wukong/View.abstract';
import DataBus from '../data/bus';
import {play} from "wukong/helper/next";

const question = [
  {
    q: '假如你穿越到古代，路遇武林门派激情混战，你会怎么做？',
    options: [
      '三十六计走为上，跑就对了',
      '静观其变，万一有钱可捡呢',
      '路见不平绝对不怂，打架带我一份',
      '看热闹不嫌事大，love&peace',
    ],
  },
  {
    q: '纠结之时，突然一位壮汉提刀向你冲来，地上恰好散落着几种武器，你会拿起哪件防身？',
    options: [
      '英气十足大宝剑',
      '霸气给力狼牙棒',
      '小巧狠准柳叶刀',
      '远攻神器红缨枪',
    ],
  },
  {
    q: '你觉得以下哪个形象，更可能是你穿越之后的身份？',
    options: [
      '武功盖世的大侠|gutianle',
      '娇俏善良的师妹|zhoudongyu',
      '图谋大计的义军|chenxuedong',
      '神秘的冷艳侠女|guobiting',
    ],
  },
];

const score = [
  [
    {
      cute: 3,
      berserk: 0,
      wisdom: 5,
      money: 2,
      brave: 0,
    },
    {
      cute: 1,
      berserk: 0,
      wisdom: 3,
      money: 4,
      brave: 2,
    },
    {
      cute: 2,
      berserk: 5,
      wisdom: 0,
      money: 0,
      brave: 3,
    },
    {
      cute: 1,
      berserk: 2,
      wisdom: 3,
      money: 2,
      brave: 2,
    },
  ],
  [
    {
      cute: 0,
      berserk: 3,
      wisdom: 2,
      money: 2,
      brave: 4,
    },
    {
      cute: 2,
      berserk: 5,
      wisdom: 0,
      money: 1,
      brave: 2,
    },
    {
      cute: 1,
      berserk: 0,
      wisdom: 5,
      money: 2,
      brave: 2,
    },
    {
      cute: 1,
      berserk: 3,
      wisdom: 2,
      money: 1,
      brave: 3,
    },
  ],
  [
    {
      cute: 1,
      berserk: 3,
      wisdom: 2,
      money: 0,
      brave: 4,
    },
    {
      cute: 6,
      berserk: 0,
      wisdom: 1,
      money: 2,
      brave: 1,
    },
    {
      cute: 1,
      berserk: 0,
      wisdom: 3,
      money: 5,
      brave: 1,
    },
    {
      cute: 1,
      berserk: 4,
      wisdom: 2,
      money: 0,
      brave: 3,
    },
  ],
];

export default class Select extends Base {
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

    const bgUrl = this.getAssetUrl('bg2');
    el.style.backgroundImage = `url(${bgUrl})`;

    return el;
  }

  delegateEvents() {
    super.delegateEvents();
    this.el.addEventListener('click', event => {
      const {target} = event;
      if (!/button|img/i.test(target.tagName)) {
        return;
      }
      const {dataset: {index}} = target;
      const result = score[this.page][index];
      for (let prop in result) {
        this.result[prop] += (this.result[prop] || 0) + result[prop];
      }

      if (this.page < 2) {
        this.showPage(this.page + 1);
      } else {
        DataBus.result = result;
        this.router.setRoute('result');
      }
    }, false);
  }

  enter() {
    super.enter();
    this.result = {};
    if (this.current) {
      this.current.remove();
    }
    this.current = null;
    this.showPage(0);
  }

  createSelect(question) {
    const container = document.createElement('div');
    container.className = 'select-container page-' + this.page;
    if (this.page === 2) {
      container.classList.add('grid');
    }

    const {q, options} = question;
    const label = document.createElement('p');
    label.className = 'form-label animated tada';
    label.innerText = q;
    container.appendChild(label);

    options.forEach((option, index) => {
      let [label, avatar] = option.split('|');
      const button = document.createElement('button');
      button.innerText = label;
      button.dataset.index = index;
      if (!avatar) {
        button.className = 'form-option animated fadeInDown';
        return container.appendChild(button);
      }
      const item = document.createElement('div');
      button.className = 'form-option';
      item.className = 'form-option-item animated fadeInDown';
      const image = this.queue.getResult(avatar);
      image.dataset.index = index;
      item.appendChild(image);
      item.appendChild(button);
      container.appendChild(item);
    });

    return container;
  }

  showPage(page) {
    this.page = page;
    const p = this.current
      ? play(this.current, 'animated fadeOut faster')
          .then(() => {
            this.el.removeChild(this.current);
          })
      : Promise.resolve();
    p.then(() => {
      const select = question[page];
      page = this.createSelect(select);
      this.el.appendChild(page);
      this.current = page;
    });
  }
}
