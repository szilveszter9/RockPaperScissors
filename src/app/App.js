import { render } from './lib/Render.js';
import PubSub from './lib/PubSub.js';

import Header from './Header.js';
import Menu from './Menu.js';

import Game from './Game.js';
import { Player, Computer } from './Players.js';

export default class App {
  constructor() {
    global.pubSub = new PubSub();
  }

  async render() {
    global.pubSub.subscribe('onClickPlayerVsComputer', async () => {
      let game = new Game();

      game.setGame('Traditional');

      game.addPlayer(new Player());
      game.addPlayer(new Computer());

      let choices = await game.askPlayersToChoose();

      let results = await game.getResults(choices);

      console.log(results);
      return;
    });

    global.pubSub.subscribe('onClickComputerVsComputer', async () => {
      let game = new Game();

      game.setGame('Traditional');

      game.addPlayer(new Computer());
      game.addPlayer(new Computer());

      let choices = await game.askPlayersToChoose();

      let results = await game.getResults(choices);

      console.log(results);
    });

    return render('main', [
      [Header],
      [Menu]
    ]);
  }
}
