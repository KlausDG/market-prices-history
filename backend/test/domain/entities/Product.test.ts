import Product from "../../../src/domain/entities/Product";

jest.mock("../../../src/domain/vo/UUID.ts", () => {
  return jest.fn().mockImplementation(() => {
    return { getValue: jest.fn().mockReturnValue("mock-uuid") };
  });
});

describe("Product entity", () => {
  it("should initialize with the correct values", () => {
    const productId = "mock-product-id";
    const measurementUnitId = "mock-measurement-unit-id";
    const description = "Test Product";
    const code = 12345;

    const product = new Product(productId, measurementUnitId, description, code);

    expect(product.getDescription()).toBe(description);
    expect(product.getCode()).toBe(code);
    expect(product.getId().getValue()).toBe("mock-uuid");
    expect(product.getMeasurementUnit().getValue()).toBe("mock-uuid");
  });

  it("should create a valid product using the static create method", () => {
    const description = "Test Product";
    const code = 12345;
    const measurementUnitId = "mock-measurement-unit-id";

    const product = Product.create(description, code, measurementUnitId);

    expect(product).toBeInstanceOf(Product);
    expect(product.getDescription()).toBe(description);
    expect(product.getCode()).toBe(code);
  });
});
