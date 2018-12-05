import './styl/main.styl';
import Base from 'wukong/H5App.abstract';
import Loading from './views/loading';
import Homepage from "./views/Homepage";
import Select from './views/select';
import Result from "./views/result";


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
    const select = this.pages.select = new Select(null, this.queue);
    document.body.appendChild(select.el);
    select.on('select', () => {
      this.showResultPage();
    });
  }

  showResultPage() {
    this.pages.select.fadeOut();
    const result = this.pages.result = new Result(null, this.queue);
    document.body.appendChild(result.el);
  }
}

window.H5App = H5App;
