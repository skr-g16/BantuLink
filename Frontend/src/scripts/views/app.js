/* eslint-disable linebreak-style */
import DrawerInitiator from '../utils/drawer-intitiator.js';
import UrlParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';
class App {
  constructor({
    button,
    drawer,
    content
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    if (url == '/login' || url == '/signup') {
      const header = document.querySelector('.app-bar');
      header.style.display = 'none';
    }
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;