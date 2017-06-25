/**
 * Created by meathill on 2017/6/25.
 */
export default class Player {
  constructor() {
    this.createElement();
    this.delegateEvent();
    this.isPlaying = true;
    this.player = createjs.Sound.play('music');
  }

  createElement() {
    let el = this.el = document.createElement('div');
    el.id = 'player';
    el.innerHTML = '<i class="fa fa-music fa-spin"></i>';
    this.icon = el.firstChild;
    document.body.appendChild(el);
  }

  delegateEvent() {
    this.el.addEventListener('click', () => {
      if (this.isPlaying) {
        this.player.stop();
      } else {
        this.player.play();
      }
      this.isPlaying = !this.isPlaying;
      this.el.className = this.isPlaying ? '' : 'disabled';
      if (this.isPlaying) {
        this.icon.classList.add('fa-spin');
      } else {
        this.icon.classList.remove('fa-spin');
      }
    }, false);
  }
}