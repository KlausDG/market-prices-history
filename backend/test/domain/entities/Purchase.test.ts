import Purchase from "../../../src/domain/entities/Purchase";
import PurchasedItem from "../../../src/domain/entities/PurchasedItem";

jest.mock("../../../src/domain/vo/UUID.ts", () => {
  return jest.fn().mockImplementation(() => ({
    getValue: jest.fn().mockReturnValue("mock-uuid"),
  }));
});

describe("Purchase Entity", () => {
  const productId = "mock-product-id";

  it("should throw an error if the purchase has no items", () => {
    expect(() => new Purchase("mock-id", "mock-market-id", [])).toThrow(
      new Error("A purchase must have at least one item.")
    );
  });

  it("should calculate the total price correctly", () => {
    const item1 = new PurchasedItem(productId, 2, 10);
    const item2 = new PurchasedItem(productId, 1, 15);

    const purchase = new Purchase("mock-id", "mock-market-id", [item1, item2]);

    expect(purchase.getTotalPrice()).toBe(35);
  });

  it("should call UUID constructor and wrap the id and marketId in UUID", () => {
    const item = new PurchasedItem(productId, 2, 10);
    const purchase = new Purchase("mock-id", "mock-market-id", [item]);

    const purchaseId = purchase.getId();
    const marketId = purchase.getMarketId();

    expect(purchaseId.getValue()).toBe("mock-uuid");
    expect(marketId.getValue()).toBe("mock-uuid");
  });

  it("should create a valid purchase using the static create method", () => {
    const item = new PurchasedItem(productId, 2, 10);
    const purchase = Purchase.create("mock-market-id", [item]);

    expect(purchase).toBeInstanceOf(Purchase);
    expect(purchase.getTotalPrice()).toBe(20);
  });
});
