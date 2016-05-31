export default class App {
  constructor() {
  }

  getContainer() {
    return document.getElementById('app');
  }

  async render() {
    this.getContainer().innerHTML = 'testing';
    return;
  }
}
