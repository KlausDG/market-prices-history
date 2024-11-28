import ItemsList from "../entities/ItemsList";
import HttpClient from "../infra/interfaces/HttpClient";
import MarketItemsGateway from "./MarketItemsGateway";

export default class MarketItemsHttpGateway implements MarketItemsGateway {
  constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

  async getItems(): Promise<any> {
    const itemsData = await this.httpClient.get(`${this.baseUrl}/items`);

    const itemsList = new ItemsList(itemsData);
    return itemsList;
  }

  async addItem(item: any): Promise<any> {
    await this.httpClient.post(`${this.baseUrl}/items`, item);
  }

  async removeItem(id: string): Promise<any> {
    await this.httpClient.delete(`${this.baseUrl}/items/${id}`);
  }
}
