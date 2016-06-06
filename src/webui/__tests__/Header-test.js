'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import { render } from '../lib/Render.js';

import Header from '../Header.js';

describe('Header', () => {
  it('should render', async () => {
    await render(document.body, [[Header]]);

    let expectContains = str => expect(document.body.textContent).toContain(str);
    expectContains('Rock Paper Scissors');
  });
});
