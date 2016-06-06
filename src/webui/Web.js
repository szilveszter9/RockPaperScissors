import { render } from './lib/Render.js';
import {
  toggleMenu,
  toggleGame,
  toggleResults,
  toggleCharacterOptions
} from './lib/domHelper.js';

import Header from './Header.js';
import Menu from './Menu.js';
import Game from './Game.js';
import ChooseCharacter from './ChooseCharacter.js';
import Results from './Results.js';


export default class Web {
  async init() {
    let { publish, subscribe }  = global.pubSub;

    let [ menuItems ] = await publish('getMenuItems');
    await render('webApp', [[Web, { menuItems }]]);

    subscribe('goToMenu', async () => {
      toggleMenu(true),
      toggleGame(false)
    });

    subscribe('playGame', async () => {
      toggleMenu(false);
      toggleResults(false);
      toggleGame(true);
    });

    subscribe('beforeAskPlayersToChoose', async () => {
      toggleCharacterOptions(true);
    });

    subscribe('beforeChooseCharacter', async (eventName, options) => {
      render('CharacterOptions', [[ChooseCharacter, options]]);
    });

    subscribe('beforeGetResults', async () => {
      toggleCharacterOptions(false);
    });

    subscribe('beforeShowResults', async () => {
      toggleResults(true);
    });

    subscribe('showResults', async (eventName, results) => {
      await render('Results', [[Results, results ]])
    });
  }

  async render(options) {
    return render('main', [
      [Header],
      [Menu, options.menuItems],
      [Game]
    ]);
  }
}
