'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import Web from '../Web.js';
import { getAllMenuItems } from '../../gateway/helpers/menuItems.js';
import { render } from '../lib/Render.js';

describe('Web', () => {
  let webAppContainer = document.createElement('div');
  webAppContainer.setAttribute('id', 'webApp');
  document.body.appendChild(webAppContainer);

  it('should render', async () => {
    let menuItems = await getAllMenuItems();
    await render('webApp', [[Web, { menuItems }]]);
    expect(webAppContainer.textContent).toContain('Rock Paper Scissors');
  });
});
