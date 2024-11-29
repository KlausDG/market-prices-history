import HttpClient from "../../infra/interfaces/HttpClient";
import ReceiptGateway from "./ReceiptGateway";

export default class ReceiptHttpGateway implements ReceiptGateway {
  constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

  async analyse(receiptLink: string): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/receipt`, receiptLink);
  }
}
