import { PrismaClient } from "@prisma/client";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { PuppeteerAdapter } from "./infra/scrapper/PuppeteerScraper";

const httpServer = new ExpressAdapter();
const prisma = new PrismaClient();
const Puppeteer = new PuppeteerAdapter();

httpServer.listen(3000);

httpServer.register("get", "/scrape", async (params: any, body: any) => {
  const output = Puppeteer.scrape(
    "https://dfe-portal.svrs.rs.gov.br/Dfe/QrCodeNFce?p=43241104204666000112650480000475891040270341|2|1|1|04C2781CBC8A770E9DEF4F6DF88BE86820C5921E"
  );

  return output;
});

/**
 * Endpoints:
 * - GET - Scrap Receipt:
 *    -> Deve fazer o scrap da nota
 *    -> Criar um Market, se este ainda nã existir
 *    -> Devolver os dados da nota para o usuário  
 * - POST - Save Purchase:
 *    -> Deve percorrer os produtos e salva-los, criando Measurement Unit, se necessário.
 *    -> Deve criar um Purchase
 *    -> Deve linkar os produtos criados com o Purchase
 *    -> Deve salvar os produtos no price history
 * - GET - PriceHistory by Product:
 *    -> Deve retornar o price history completo, dado um nome de produto
 * - GET - PriceHistory by Market:
 *    -> Deve retornar o price history de todos os produtos de um mercado, agrupados pelo nome, ou código.
 * - GET - Purchases:
 *    -> Deve retornar todas as purchases, ordenadas por data
 */
