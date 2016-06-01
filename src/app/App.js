import { render } from './lib/Render.js';
import PubSub from './lib/PubSub.js';

import Header from './Header.js';
import Menu from './Menu.js';

export default class App {
  constructor() {
    global.pubSub = new PubSub();
  }

  async render() {
    return render('main', [
      [Header],
      [Menu]
    ]);
  }
}
