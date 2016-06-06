import clone from '../lib/utils/clone.js';

export default class MenuItems {
  async init() {
    await this.connect();
    return this;
  }

  async connect() {
    this.data = require('../data/menuItems.js').default;
  }

  async getAll() {
    return await clone(this.data);
  }
}
