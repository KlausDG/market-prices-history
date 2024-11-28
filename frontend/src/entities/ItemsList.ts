import Item from "./Item";
import Observable from "./Observable";

export default class ItemsList extends Observable {
  items: Item[];

  constructor(items?: any) {
    super();

    this.items = [];
    if (items) {
      for (const item of items) {
        this.items.push(new Item(item.id, item.description, item.price));
      }
    }
  }

  async addItem(description: string, price: number) {
    if (!description) return;
    if (this.items.some((item: any) => item.description === description)) return;
    if (this.items.filter((item: any) => !item.done).length > 4) return;
    const item = new Item(null, description, price);
    this.items.push(item);
    this.notify("addItem", item);
  }

  async removeItem(item: any) {
    this.items.splice(this.items.indexOf(item), 1);
    this.notify("removeItem", item);
  }

  getItem(description: string) {
    return this.items.find((item) => item.description === description);
  }
}
