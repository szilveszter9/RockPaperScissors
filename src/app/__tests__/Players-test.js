'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import PubSub from '../lib/PubSub.js';
import { Player, Computer, NoOne } from '../Players.js';

window.setTimeout = process.nextTick;

window.pubSub = new PubSub();

describe('Player', () => {
  it('choose a single character from a list', async () => {
    let player = new Player();
    process.nextTick(() => window.pubSub.publish('onSelectCharacter', 0));
    let choice = await player.choose(['a','b','c']);
    expect(choice.length).toEqual(2);
    expect(choice).toEqual([ 'onSelectCharacter', 0 ]);
  });

  it('set and get name', async () => {
    let player = new Player();
    let name = 'Random' + Date.now() + Math.random();
    player.setName(name);
    expect(player.getName()).toEqual(name);
  });
});

describe('Computer', () => {
  it('choose a single random character from a list', async () => {
    let player = new Computer();
    for(let i = 0; i<100; i++) {
      let choice = await player.choose(['a','b','c']);
      let isChoiceInRange = new Set([0,1,2]).has(choice[1]);
      expect(choice.length).toEqual(2);
      expect(isChoiceInRange).toBeTruthy();
    }
  });
});
