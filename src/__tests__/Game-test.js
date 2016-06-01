'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import Game from '../app/Game.js';
import Games from '../app/Games.js';
import { Player, Computer } from '../app/Players.js';

describe('Game', () => {
  it('adds players and characters and asks to choose', async () => {
    let game = new Game();
    let player1 = new Player();
    let player2 = new Computer();

    game.setGame('Traditional');

    game.addPlayer(player1);
    game.addPlayer(player2);

    let choices = await game.askPlayersToChoose();

    let results = await game.getResults(choices);

    console.log(results);
    expect(choices.length).toEqual(2);
  });
});
