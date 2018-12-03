import './styl/main.styl';
import Base from 'wukong/H5App.abstract';
import Loading from './views/loading';
import Homepage from "./views/Homepage";
import Select from './views/select';

class H5App extends Base{
  showHomepage() {
    const el = document.getElementById('loading');
    const loading = new Loading(el);

    loading.close()
      .then(() => {
        const homepage = this.pages.homepage = new Homepage(null, this.queue);
        document.body.appendChild(homepage.el);
        homepage.on('start', () => {
          this.showSelectPage();
        });
      });
  }

  showSelectPage() {
    this.pages.homepage.fadeOut();
    const select = new Select(null, this.queue);
    document.body.appendChild(select);
    select.on('complete', () => {
      this.showResultPage();
    });
  }

  showResultPage() {

  }
}

window.H5App = H5App;
