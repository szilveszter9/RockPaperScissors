'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import { getGame } from '../../gateway/helpers/games.js';
import Game from '../Game.js';
import { Player, Computer, NoOne } from '../Players.js';

describe('Game - add players and setup a new game', () => {
  async function game() {
    let selectedGame = await getGame('Traditional');

    let game = new Game();
    let player1 = new Player();
    let player2 = new Computer();

    game.setGame(selectedGame);

    game.addPlayer(player1);
    game.addPlayer(player2);
    return { game, player1, player2 };
  }

  it('and asks to choose then decides who is the winner', async () => {
    let { game, player1 } = await game();
    let choices = [1, 0];
    let results = await game.getResults(choices);
    expect(results.winner).toBe(player1);
  });

  it('2nd player can also win', async () => {
    let { game, player2 } = await game();
    let choices = [0, 1];
    let results = await game.getResults(choices);
    expect(results.winner).toBe(player2);
  });

  it('players choose the same card', async () => {
    let { game } = await game();
    let choices = [0, 0];
    let results = await game.getResults(choices);
    expect(results.winner.getName()).toEqual('No one');
  });

  it('user choice does not match any characters', async () => {
    let { game } = await game();
    let choices = [0, 5];
    let results = await game.getResults(choices);
    expect(results.winner.getName()).toEqual('No one');
  });
});
