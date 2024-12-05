import Market from "../../../src/domain/entities/Market";

jest.mock("../../../src/domain/vo/UUID.ts", () => {
  return jest.fn().mockImplementation(() => {
    return { getValue: jest.fn().mockReturnValue("mock-uuid") };
  });
});

describe("Market entity", () => {
  it("should initialize with the correct values", () => {
    const marketId = "mock-uuid";
    const description = "Test Market";
    const cnpj = "99.674.314/0001-37";
    const address = "Test address";

    const market = new Market(marketId, description, cnpj, address);

    expect(market).toBeInstanceOf(Market);
    expect(market.getValues()).toEqual({
      id: "mock-uuid",
      description,
      cnpj,
      address,
    });
  });

  it("should create a Market with static create method", () => {
    const description = "Test Market";
    const cnpj = "12345678000195";
    const address = "Test Address";

    const market = Market.create(description, cnpj, address);

    expect(market).toBeInstanceOf(Market);
    expect(market.getValues()).toEqual({
      id: "mock-uuid",
      description,
      cnpj: "12.345.678/0001-95",
      address,
    });
  });
});
