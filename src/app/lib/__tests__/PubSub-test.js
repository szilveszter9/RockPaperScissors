'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import PubSub from '../PubSub.js';

describe('PubSub', () => {
  let pubSub = new PubSub();

  it('subscribe and publish', async () => {
    let state = 0;
    pubSub.subscribe(
      'someEvent',
      async (...parms) => {
        process.nextTick(
          () => {
            state = parms;
            return $return();
          }
        )
      }
    );
    await pubSub.publish('someEvent', 1, 2, 3);
    expect(state).toEqual(['someEvent', 1, 2, 3]);
  });
});
