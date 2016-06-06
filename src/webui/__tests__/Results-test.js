'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import { render } from '../lib/Render.js';

import Results from '../Results.js';

describe('Results', () => {
  it('should render', async () => {
    await render(document.body,
      [[Results,
        {winner: {getName: () => 'Someone is lucky...'},
          rule: '...because it is Friday'}]]);

    let expectContains = str => expect(document.body.innerHTML).toContain(str);
    expectContains('Someone is lucky');
    expectContains('because it is Friday');
  });
});
