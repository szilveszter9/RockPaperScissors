'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import { render } from '../Render.js';

class Header {
  async render() {
    return 'Rock';
  }
}

class Menu {
  async render() {
    process.nextTick(
      () => {
        return $return('Paper Scissors');
      }
    )
  }
}

describe('Render', () => {
  it('render', async () => {
    let container = await render(document.body, [
      [Header],
      [Menu]
    ]);

    let expectContains = str => expect(container.textContent).toContain(str);
    expectContains('Paper');
    expectContains('Scissors');
    expectContains('Rock');
  });
});
