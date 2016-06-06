import config from '../config.js';

let playersConfig = config.default.game.players;

export class NoOne {
  getName() {
    return playersConfig.noOne.name;
  }
}

class BasePlayer {
  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
}

export class Player extends BasePlayer {
  constructor() {
    super();
    this.type = 'player';
  }

  async choose(characters) {
    await global.pubSub.publish('beforeChooseCharacter', {
      playerType: this.getType(),
      characters: Object.assign([], characters)
    });
    global.pubSub.subscribe('onSelectCharacter', (...args) => {
      return $return(args);
    });
  }
}

export class Computer extends BasePlayer {
  constructor() {
    super();
    this.type = 'computer';
  }

  async choose(characters) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    await global.pubSub.publish('beforeChooseCharacter', {
      playerType: this.getType()
    });
    return [null, randomIndex];
  }
}
