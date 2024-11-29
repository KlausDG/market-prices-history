export default interface ReceiptGateway {
  analyse(receiptLink: string): Promise<any>;
}
