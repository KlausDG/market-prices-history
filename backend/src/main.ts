import { PrismaClient } from "@prisma/client";
import { ExpressAdapter } from "./infra/http/HttpServer";

const httpServer = new ExpressAdapter();
const prisma = new PrismaClient();

httpServer.listen(3000);

/**
 * Endpoints:
 * - GET - Scrap Receipt - Should also crete a new Market(?) if it doesn't exist
 * - POST -
 */
