import ItemsList from "../entities/ItemsList";
import MarketItemsGateway from "./MarketItemsGateway";

export default class MarketItemsMemoryGateway implements MarketItemsGateway {
  items: ItemsList;

  constructor() {
    this.items = new ItemsList([
      { id: Math.random().toString(36).slice(2, 7), description: "Pão Francês", price: 5.84 },
      { id: Math.random().toString(36).slice(2, 7), description: "Picanha", price: 40.58 },
      { id: Math.random().toString(36).slice(2, 7), description: "Sabonete", price: 2.49 },
    ]);
  }

  async getItems(): Promise<any> {
    return this.items;
  }

  async addItem(item: any): Promise<any> {
    this.items.addItem(item.description, item.price);
  }

  async removeItem(id: string): Promise<any> {
    this.items.removeItem({
      id,
      description: "",
      price: 0,
    });
  }
}
