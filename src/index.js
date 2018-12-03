import './styl/main.styl';
import Base from 'wukong/H5App.abstract';
import Loading from './views/loading';
import Homepage from "./views/Homepage";

class H5App extends Base{
  showHomepage() {
    const el = document.getElementById('loading');
    const loading = new Loading(el);

    const homepage = new Homepage(null, this.queue);
    document.body.appendChild(homepage.el);
  }
}

window.H5App = H5App;
