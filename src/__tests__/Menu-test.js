'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import { render } from '../app/lib/Render.js';

import Menu from '../app/Menu.js';

describe('Menu', () => {
  it('should render', async () => {
    await render(document.body, [[Menu]]);

    let expectContains = str => expect(document.body.textContent).toContain(str);
    expectContains('New Game - Player vs Computer');
    expectContains('New Game - Computer vs Computer');
  });
});
