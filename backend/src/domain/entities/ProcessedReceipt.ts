import Market from "./Market";

interface ProductData {
  description: string;
  code: number;
  quantity: number;
  measurementUnit: string;
  unitaryValue: number;
  totalValue: number;
}

export default class ProcessedReceipt {
  readonly issueDate: string;

  constructor(
    readonly market: Market,
    readonly productsList: ProductData[],
    readonly totalItems: number,
    readonly totalPrice: number
  ) {
    if (productsList.length === 0 || totalItems === 0) {
      throw new Error("A receipt must have at least one item.");
    }

    this.issueDate = new Date().toISOString();
  }

  getValues() {
    return {
      market: this.market,
      productsList: this.productsList,
      totalItems: this.totalItems,
      totalPrice: this.totalPrice,
      issueDate: this.issueDate,
    };
  }
}
