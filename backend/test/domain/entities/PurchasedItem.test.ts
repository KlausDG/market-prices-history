import PurchasedItem from "../../../src/domain/entities/PurchasedItem";

describe("PurchasedItem enity", () => {
  it("should create a valid instance", () => {
    const productId = "123e4567-e89b-12d3-a456-426614174000";
    const quantity = 2;
    const unitPrice = 50;

    const purchasedItem = new PurchasedItem(productId, quantity, unitPrice);

    expect(purchasedItem.getTotalPrice()).toBe(100);
    expect(purchasedItem).toBeInstanceOf(PurchasedItem);
  });

  it("should throw an error if quantity is less than or equal to zero", () => {
    const productId = "123e4567-e89b-12d3-a456-426614174000";
    const quantity = 0;
    const unitPrice = 50;

    expect(() => new PurchasedItem(productId, quantity, unitPrice)).toThrow("Quantity must be greater than zero.");
  });

  it("should throw an error if unit price is less than or equal to zero", () => {
    const productId = "123e4567-e89b-12d3-a456-426614174000";
    const quantity = 2;
    const unitPrice = 0;

    expect(() => new PurchasedItem(productId, quantity, unitPrice)).toThrow("Unit price must be greater than zero.");
  });

  it("should calculate totalPrice correctly", () => {
    const productId = "123e4567-e89b-12d3-a456-426614174000";
    const quantity = 3;
    const unitPrice = 30;

    const purchasedItem = new PurchasedItem(productId, quantity, unitPrice);

    expect(purchasedItem.getTotalPrice()).toBe(90);
  });

  it("should create a PurchasedItem using the static create method", () => {
    const productId = "123e4567-e89b-12d3-a456-426614174000";
    const quantity = 4;
    const unitPrice = 25;

    const purchasedItem = PurchasedItem.create(productId, quantity, unitPrice);

    expect(purchasedItem).toBeInstanceOf(PurchasedItem);
    expect(purchasedItem.getTotalPrice()).toBe(100);
  });
});
