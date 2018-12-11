import './styl/main.styl';
import Base from 'wukong/H5App.abstract';
import Loading from './views/loading';
import Homepage from "./views/Homepage";
import Select from './views/select';
import Result from './views/result';
import ResultTemplate from "./views/result.pug";
import pages from './views/pages';

const templates = {
  select: Select,
  result: ResultTemplate,
};

const classMap = {
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
    return templates[page];
  }

  getPageOptions(name) {
    return pages[name];
  }

  getKlass(name) {
    return classMap[name];
  }
}

window.H5App = H5App;
