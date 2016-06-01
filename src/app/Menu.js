const MENU_ITEMS = [
  { id: 'PlayerVsComputer', name: 'New Game - Player vs Computer' },
  { id: 'ComputerVsComputer', name: 'New Game - Computer vs Computer' }
];

export default class Menu {
  getMenuItems() {
    return MENU_ITEMS;
  }

  async render() {
    return this.getMenuItems().reduce((acc, item) => {
       let onClick = `window.pubSub.publish('onClick${item.id}')`;
       return `${acc}<button id=${item.id} onclick=${onClick}>${item.name}</button>`
    }, '');
  }
}
