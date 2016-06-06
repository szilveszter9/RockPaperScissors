import clone from '../lib/utils/clone.js';

export default class Games {
  async init() {
    await this.connect();
    return this;
  }

  async connect() {
    this.data = require('../data/games.js').default;
  }

  async getByName(gameName) {
    let selectedGame = this.data.find(game => game.name === gameName);
    return await clone(selectedGame);
  }
}
