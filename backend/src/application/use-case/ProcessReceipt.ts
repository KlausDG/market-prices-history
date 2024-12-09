import ProcessedReceipt from "../../domain/entities/ProcessedReceipt";
import URL from "../../domain/vo/URL";
import MarketRepository from "../../infra/repository/MarketRepository";
import ReceiptRepository from "../../infra/repository/ReceiptRepository";

interface ProcessReceiptUseCase {
  execute(crudeUrl: string): Promise<ProcessedReceipt>;
}

export default class ProcessReceipt implements ProcessReceiptUseCase {
  //DIP - Dependency Inversion Principle
  constructor(readonly receiptRepository: ReceiptRepository, readonly marketRepository: MarketRepository) {}

  async execute(crudeUrl: string) {
    const url = new URL(crudeUrl);
    const receipt = await this.receiptRepository.scanReceipt(url.getValue());
    const marketData = receipt.market;

    const market = await this.marketRepository.saveMarket(marketData);

    return new ProcessedReceipt(market, receipt.productsList, receipt.totalItems, receipt.totalPrice);
  }
}
