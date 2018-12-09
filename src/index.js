import './styl/main.styl';
import Base from 'wukong/H5App.abstract';
import Loading from './views/loading';
import Homepage from "./views/Homepage";
import Select from './views/select';
import Result from "./views/result";
import pages from './views/pages';

const classMap = {
  select: Select,
  result: Result,
};

class H5App extends Base {
  showHomepage() {
    const el = document.getElementById('loading');
    const loading = new Loading(el);

    loading.close()
      .then(() => {
        if (this.router.getRoute(0) === 'home') {
          const homepage = this.pages.homepage = new Homepage(null, this.queue);
          this.currentPage = homepage;
          document.body.appendChild(homepage.el);
        }
      });
  }

  getTemplate(page) {
    return classMap[page];
  }

  getPageOptions(name) {
    return pages[name];
  }
}

window.H5App = H5App;
