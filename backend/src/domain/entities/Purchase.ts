import UUID from "../vo/UUID";
import PurchasedItem from "./PurchasedItem";

export default class Purchase {
  private id: UUID;
  private marketId: UUID;
  private totalPrice: number;

  constructor(id: string, marketId: string, readonly items: PurchasedItem[]) {
    if (items.length === 0) {
      throw new Error("A purchase must have at least one item.");
    }

    this.id = new UUID(id);
    this.marketId = new UUID(marketId);
    this.totalPrice = this.calculateTotalPrice(items);
  }

  private calculateTotalPrice(items: PurchasedItem[]) {
    return items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
  }

  static create(marketId: string, items: PurchasedItem[]) {
    const id = crypto.randomUUID();

    return new Purchase(id, marketId, items);
  }

  getId() {
    return this.id;
  }

  getMarketId() {
    return this.marketId;
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}
