/**
 * Created by meathill on 2017/6/25.
 */
import $ from 'sizzle';

export default class Clouds {
  constructor(queue) {
    this.el = $('#clouds');
    for (let i = 0, len = 5; i < 5; i++) {
      let image = queue.getResult(`cloud${i + 1}`);
      this.el.appendChild(image);
    }
  }
}