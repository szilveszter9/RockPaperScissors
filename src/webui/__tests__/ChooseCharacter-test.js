'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import { render } from '../lib/Render.js';
import { getGame } from '../../gateway/helpers/games.js';
import ChooseCharacter from '../ChooseCharacter.js';

describe('ChooseCharacter', () => {
  it('should render options if player is a player', async () => {
    let characters = (await getGame('Traditional')).characters;
    await render(document.body,
      [[ChooseCharacter, {playerType: 'player', characters}]]);

    let expectContains = str => expect(document.body.innerHTML).toContain(str);
    expectContains('Rock.jpg');
    expectContains('Paper.jpg');
    expectContains('Scissors.jpg');
  });

  it('should render info if player is a computer', async () => {
    let characters = (await getGame('Traditional')).characters;
    await render(document.body,
      [[ChooseCharacter, {playerType: 'computer', characters}]]);

    let expectContains = str => expect(document.body.innerHTML).toContain(str);
    expectContains('Computer has chosen one');
  });
});
