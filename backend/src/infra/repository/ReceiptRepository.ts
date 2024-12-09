import Receipt from "../../domain/entities/Receipt";
import { PuppeteerAdapter } from "../scrapper/PuppeteerScraper";

export default interface ReceiptRepositoryInterface {
  scanReceipt(url: string): Promise<Receipt>;
}

export default class ReceiptRepository implements ReceiptRepositoryInterface {
  constructor(readonly puppeteer: PuppeteerAdapter) {}

  async scanReceipt(url: string) {
    const receiptScrappedData = await this.puppeteer.scrape(url);

    return new Receipt(
      receiptScrappedData.market,
      receiptScrappedData.items,
      receiptScrappedData.totalItems,
      receiptScrappedData.totalPrice
    );
  }
}
