import PubSub from './lib/PubSub.js';

import Game from './Game.js';
import { Player, Computer } from './Players.js';
import { getAllMenuItems } from '../gateway/helpers/menuItems.js';
import { getGame } from '../gateway/helpers/games.js';

let currentGame;
let players = { Player, Computer };

export default class App {
  constructor() {
    global.pubSub = new PubSub();
  }

  async init() {
    let { publish, subscribe }  = global.pubSub;

    subscribe('playGamePlayerVsComputer',
      this.playGamePlayerVsComputer.bind(this));
    subscribe('playGameComputerVsComputer',
      this.playGameComputerVsComputer.bind(this));
    subscribe('playAgain', this.playGame.bind(this));
    subscribe('getMenuItems', async () => {
      return await getAllMenuItems();
    });
  }

  async playGamePlayerVsComputer(eventName, gameName) {
    await this.prepareGame({ gameName,
      players: [
        {class: 'Player', name: 'Player'},
        {class: 'Computer', name: 'Computer'}
      ]
    });
    return await this.playGame.call(this);
  }

  async playGameComputerVsComputer(eventName, gameName) {
    await this.prepareGame({ gameName,
      players: [
        {class: 'Computer', name: 'Blue Computer'},
        {class: 'Computer', name: 'Red Computer'}
      ]
    });
    return await this.playGame.call(this);
  }

  async prepareGame(options) {
    let selectedGame = await getGame(options.gameName);

    let game = new Game();
    game.setGame(selectedGame);
    currentGame = game;

    options.players.forEach(playerOptions => {
      let player = new players[playerOptions.class]();
      player.setName(playerOptions.name);
      game.addPlayer(player);
    })
  }

  async playGame() {
    let { publish }  = global.pubSub;

    await publish('playGame');
    let game = currentGame;

    await publish('beforeAskPlayersToChoose');
    let choices = await game.askPlayersToChoose();
    await publish('beforeGetResults');
    let results = await game.getResults(choices);

    await publish('beforeShowResults');
    await publish('showResults', results);
    return;
  }
}
