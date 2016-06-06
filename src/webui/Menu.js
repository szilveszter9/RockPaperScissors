import config from '../config.js';

let cdn = config.default.web.cdn;

export default class Menu {
  async render(menuItems) {
    return menuItems.reduce((acc, item) => {
      let onClick = `window.pubSub.publish('playGame${item.id}', '${item.gameType}')`;

      return `${acc}<button id="${item.id}" onclick="${onClick}">
                 <img src="${cdn}/${item.image}" alt="${item.name}">
               </button>`
    }, '') + `<div class="logo"><img
                src="${cdn}/RockPaperScissors.jpg"
                alt="Let\'s play Rock Paper Scissors!"></div>`;
  }
}
