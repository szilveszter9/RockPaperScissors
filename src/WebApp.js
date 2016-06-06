import App from './app/App.js';
import Web from './webui/Web.js';

export default class WebApp {
  async start() {
    let app = new App();
    await app.init();
    let web = new Web();
    await web.init();
  }
}
