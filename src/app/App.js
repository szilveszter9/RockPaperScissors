import { render } from './lib/Render.js';
import PubSub from './lib/PubSub.js';

import Header from './Header.js';
import Menu from './Menu.js';

export default class App {
  constructor() {
    global.pubSub = new PubSub();
  }

  async render() {
    global.pubSub.subscribe('onClickPlayerVsComputer', async (...args) => {
      await (async function(){setTimeout(function(){return $return()},2000)}());
      console.log(args);
      return;
    });
    global.pubSub.subscribe('onClickComputerVsComputer', async (...args) => console.log(args));

    return render('main', [
      [Header],
      [Menu]
    ]);
  }
}
