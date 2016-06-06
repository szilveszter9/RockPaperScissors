import MenuItems from '../MenuItems.js';

export async function getAllMenuItems() {
  let menuItemsConnection = await (new MenuItems()).init();
  return await menuItemsConnection.getAll();
}
