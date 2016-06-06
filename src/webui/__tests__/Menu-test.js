'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import { render } from '../lib/Render.js';

import Menu from '../Menu.js';
import { getAllMenuItems } from '../../gateway/helpers/menuItems.js';

describe('Menu', () => {
  it('should render', async () => {
    let menuItems = await getAllMenuItems();
    await render(document.body, [[Menu, menuItems]]);

    let expectContains = str => expect(document.body.innerHTML).toContain(str);
    expectContains('New Game - Player vs Computer');
    expectContains('New Game - Computer vs Computer');
  });
});
