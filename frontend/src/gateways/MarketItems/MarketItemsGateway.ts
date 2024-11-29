export default interface MarketItemsGateway {
  getItems(): Promise<any>;
  addItem(item: any): Promise<any>;
  removeItem(id: string): Promise<any>;
}
