'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import App from '../app/App.js';
import { render } from '../app/lib/Render.js';

describe('App', () => {
  let appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app');
  document.body.appendChild(appContainer);

  it('should render', async () => {
    await render('app', [[App]]);
    expect(appContainer.textContent).toContain('Rock Paper Scissors');
  });
});

describe('Can I play', () => {
  let appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app');
  document.body.appendChild(appContainer);

  it('Player vs Computer?', async () => {
    await render('app', [[App]]);
    expect(false).toBeTruthy();
  });
  it('Computer vs Computer?', async () => {
    await render('app', [[App]]);
    expect(false).toBeTruthy();
  });
  it('a different game each time?', async () => {
    await render('app', [[App]]);
    expect(false).toBeTruthy();
  });
});
