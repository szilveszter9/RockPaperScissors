import config from '../config.js';

let cdn = config.default.web.cdn;

export default class ChooseCharacter {
  async render({ playerType, characters }) {
    if(playerType === 'computer')
      return '<h2>Computer has chosen one.</h2>';

    return characters.reduce((acc, character, key) => {
      let onClick = `window.pubSub.publish('onSelectCharacter', '${key}')`;
      return `${acc}<button onclick="${onClick}"><img
                  src="${cdn}/${character.image}"
                  alt="${character.name}"
                ></button>`;
    }, '');
  }
}
