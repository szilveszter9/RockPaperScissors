import Games from '../Games.js';

import clone from '../../lib/utils/clone.js';

export async function getGame(gameName) {
  let gamesConnection = await (new Games()).init();
  let game = await gamesConnection.getByName(gameName);
  let gameData = await clone(game);

  gameData.characters = gameData.characters.map(image => {
    let name = image.replace(/\..*/, '');
    return { name, image };
  });

  gameData.rules = gameData.rules.map(image => {
    let [ prior, verb, after ] = image.replace(/\..*/, '').split('_');
    return { prior, verb, after, image };
  });

  return gameData;
}
