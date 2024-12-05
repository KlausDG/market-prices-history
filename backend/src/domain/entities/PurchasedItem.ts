import UUID from "../vo/UUID";

export default class PurchasedItem {
  private productId: UUID;
  private totalPrice: number;

  constructor(productId: string, readonly quantity: number, readonly unitPrice: number) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }

    if (unitPrice <= 0) {
      throw new Error("Unit price must be greater than zero.");
    }

    this.productId = new UUID(productId);
    this.totalPrice = unitPrice * quantity;
  }

  static create(productId: string, quantity: number, unitPrice: number) {
    return new PurchasedItem(productId, quantity, unitPrice);
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}
