import ProcessReceipt from "../../application/use-case/ProcessReceipt";
import HttpServer from "../http/HttpServer";

export default class ReceiptController {
  constructor(readonly httpServer: HttpServer, readonly processReceipt: ProcessReceipt) {
    httpServer.register("post", "/scrape", async (_: any, body: any) => {
      //Replace with use-case
      const output = processReceipt.execute(body.url);

      return output;
    });
  }
}
