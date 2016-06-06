'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});
window.setTimeout = process.nextTick;

import WebApp from '../WebApp.js';
import { Player, Computer } from '../app/Players.js';
let webApp = new WebApp();

const PLAYER_VS_COMPUTER_SELECTOR = '#PlayerVsComputer';
const COMPUTER_VS_COMPUTER_SELECTOR = '#ComputerVsComputer';

// can't simply `let getElement = document.querySelector` due to illegal invocation
let getElement = qs => document.querySelector(qs);
let getClickHandler = qs => getElement(qs).getAttribute('onClick');

describe('Can I play', () => {
  let appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'webApp');
  document.body.appendChild(appContainer);

  it('Player vs Computer?', async () => {
    await webApp.start();
    let click = getClickHandler(PLAYER_VS_COMPUTER_SELECTOR);

    expect(click).toEqual("window.pubSub.publish('playGamePlayerVsComputer', 'Traditional')");
    let game = window.pubSub.publish('playGamePlayerVsComputer', 'Traditional');

    let player = new Player();
    process.nextTick(() => window.pubSub.publish('onSelectCharacter', 0));
    let choice = await player.choose(['a','b','c']);

    let expectHidden = qs => expect(getElement(qs).classList.contains('hidden')).toBeTruthy();
    expectHidden('.Menu');

  });

  it('Computer vs Computer?', async () => {
    await webApp.start();
    let click = getClickHandler(COMPUTER_VS_COMPUTER_SELECTOR);

    expect(click).toEqual("window.pubSub.publish('playGameComputerVsComputer', 'Dilbert')");

    global.pubSub.subscribe('showResults', (...args) => {
      expect(args[1].winner).toBeTruthy();
    });

    expect(getElement('.ResultsMenu')).toBeFalsy();
    let game = window.pubSub.publish('playGameComputerVsComputer', 'Dilbert');
    game.then((...args) => {
      expect(getElement('.ResultsMenu').innerHTML.length > 10).toBeTruthy();
      return $return();
    });
  });

  //it('a different game each time?', async () => {
  //  await render('app', [[App]]);
  //  expect(false).toBeTruthy();
  //});
});
