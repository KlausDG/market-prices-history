interface MarketData {
  description: string;
  cnpj: string;
  address: string;
}

interface ProductData {
  description: string;
  code: number;
  quantity: number;
  measurementUnit: string;
  unitaryValue: number;
  totalValue: number;
}

export default class Receipt {
  constructor(
    readonly market: MarketData,
    readonly productsList: ProductData[],
    readonly totalItems: number,
    readonly totalPrice: number
  ) {
    if (productsList.length === 0 || totalItems === 0) {
      throw new Error("A receipt must have at least one item.");
    }
  }

  getValues() {
    return {
      market: this.market,
      productsList: this.productsList,
      totalItems: this.totalItems,
      totalPrice: this.totalPrice,
    };
  }
}
