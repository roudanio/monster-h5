import Base from 'wukong/View.abstract';
import DataBus from '../data/bus';
import {play, sleep} from "wukong/helper/next";

const texts = {
  cute: {
    title: '萌值爆表',
    description: '嘤嘤怪中的战斗机、好运小迷糊、自带软萌BGM、高调敛财低调炫富、一人顶一个战斗连',
  },
  berserk: {
    title: '战力惊人',
    description: '该出手时绝不手软、肌肉天使、极速输出连环炮、一言不合正面刚、S级智多星',
  },
  wisdom: {
    title: '智商超群',
    description: '团队智商担当、一针见血段子手、能动嘴的绝不动手、活体“印钞机”、一心向钱冲',
  },
  money: {
    title: '吸金能手',
    description: '天选锦鲤、脑子转的比算盘快、高调敛财低调炫富、遇事不慌走路嚣张、可爱到冒泡',
  },
  brave: {
    title: '果敢神勇',
    description: '天生王者范儿、一言不合正面刚、从不纠结星人、小嘴叭叭的、团宠体质',
  },
};

export default class Result extends Base {
  constructor(el, queue, options) {
    super(el, queue, options);
    this.container = this.el.getElementsByClassName('result-container')[0];
  }
  delegateEvents() {
    super.delegateEvents();

    this.queue.on('complete', this.onLoadComplete, this);
    this.share = this.el.getElementsByClassName('share')[0];
    this.el.getElementsByClassName('share-button')[0].addEventListener('click', () => {
      this.share.classList.remove('hide');
      play(this.share, 'fadeIn')
        .then(() => {
          this.share.classList.remove('fadeIn');
        });
    }, false);
    this.share.addEventListener('click', () => {
      play(this.share, 'fadeOut')
        .then(() => {
          this.share.classList.add('hide');
          this.share.classList.remove('fadeOut');
        });
    });
  }

  enter() {
    super.enter();
    this.el.classList.remove('fadeOut');
    this.scores = [];

    const result = Object.assign({}, DataBus.result);
    let total = 0;
    let max = 0;
    let maxIndex = -1;
    let maxKey = 'cute';
    for (let prop in result) {
      const item = result[prop];
      total += item;
      if (item > max) {
        max = item;
        maxKey = prop;
      }
    }
    let count = 0;
    for (let prop in result) {
      const percent = Math.round(result[prop] / total * 100);
      const div = document.createElement('div');
      div.className = 'score animated hide ' + prop;
      div.innerText = percent + '%';
      this.scores.push(div);
      this.container.appendChild(div);
      maxIndex = maxKey === prop ? count : maxIndex;
      count++;
    }
    // 把最大的放最后
    const item = this.scores[maxIndex];
    this.scores.splice(maxIndex, 1);
    this.scores.push(item);

    const key = this.key = `result-${maxKey}`;
    const image = this.queue.getResult(key);
    const text = texts[maxKey];
    this.el.getElementsByTagName('h1')[0].innerText = text.title;
    this.el.getElementsByClassName('lead')[0].innerText = text.description;
    if (!image) {
      this.queue.loadFile({id: key, src: `./img/${key}.png`});
    } else {
      this.showImage(image);
    }
  }

  exit() {
    return super.exit()
      .then(() => {
        this.image.classList.add('invisible');
        this.image = null;
        this.scores.forEach(item => item.remove());
      });
  }

  showImage(image) {
    this.image = image;
    image.className = `result-image ${this.key} animated`;
    const placeholder = this.el.getElementsByClassName('result-image')[0];
    placeholder.replaceWith(image);
    sleep(.5)
      .then(() => {
        return play(this.image, 'tada');
      })
      .then(() => {
        return this.scores.reduce((p, item ) => {
          return p
            .then(() => {
              item.classList.remove('hide');
              play(item, 'tada');
              return sleep(.25);
            })
        }, Promise.resolve());
      });
  }

  onLoadComplete() {
    this.showImage(this.queue.getResult(this.key));
  }
}
