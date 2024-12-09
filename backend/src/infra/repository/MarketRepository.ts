import { PrismaClient } from "@prisma/client";
import Market from "../../domain/entities/Market";

export default interface MarketRepository {
  saveMarket(market: MarketData): Promise<Market>;
}

type MarketData = {
  description: string;
  cnpj: string;
  address: string;
};

export default class MarketRepositoryDatabase implements MarketRepository {
  constructor(private prisma: PrismaClient) {}

  async saveMarket(market: MarketData) {
    const marketDatabaseData = await this.prisma.market.upsert({
      where: {
        cnpj: market.cnpj,
      },
      update: {},
      create: {
        description: market.description,
        cnpj: market.cnpj,
        address: market.address,
      },
    });

    return new Market(
      marketDatabaseData.id,
      marketDatabaseData.description,
      marketDatabaseData.cnpj,
      marketDatabaseData.address
    );
  }
}
