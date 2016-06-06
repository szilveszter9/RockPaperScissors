'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import { render } from '../lib/Render.js';

import Game from '../Game.js';

describe('Game', () => {
  it('should render', async () => {
    await render(document.body, [[Game]]);

    let expectContains = str => expect(document.body.innerHTML).toContain(str);
    expectContains('id="CharacterOptions"');
    expectContains('id="Results"');
  });
});
