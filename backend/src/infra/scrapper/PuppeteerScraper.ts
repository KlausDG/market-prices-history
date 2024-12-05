import puppeteer from "puppeteer";

interface MarketData {
  name: string;
  cnpj: string;
  address: string;
}

interface ItemData {
  name: string;
  code: number;
  quantity: number;
  unit: string;
  unitValue: number;
  totalValue: number;
}

interface PurchaseData {
  market: MarketData;
  items: ItemData[];
  totalItems: number;
  totalPrice: number;
}

export interface Scraper {
  scrape(url: string): Promise<PurchaseData>;
}

export class PuppeteerAdapter implements Scraper {
  async scrape(url: string): Promise<any> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.setRequestInterception(true);
      page.on("request", (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;
        if (
          interceptedRequest.url().endsWith(".png") ||
          interceptedRequest.url().endsWith(".jpg") ||
          interceptedRequest.url().endsWith(".css")
        )
          interceptedRequest.abort();
        else interceptedRequest.continue();
      });

      await page.goto(url, { waitUntil: "domcontentloaded" });

      const data = await page.evaluate(() => {
        const marketInfoNodes = document.querySelector(".txtCenter")?.children || [];
        const marketName = marketInfoNodes?.[0]?.textContent?.trim() || "";
        const marketCnpj = marketInfoNodes?.[1]?.textContent?.trim() || "";
        const marketAddress = marketInfoNodes?.[2]?.textContent?.trim() || "";

        const rows = Array.from(document.querySelectorAll("tr"));
        const items = rows.map((row) => ({
          name: row.querySelector(".txtTit")?.textContent?.trim() || "",
          code: parseInt(row.querySelector(".RCod")?.textContent?.match(/(\d+)/)?.[1] || "0", 10),
          quantity: parseFloat(row.querySelector(".Rqtd")?.textContent?.match(/Qtde\.\:\s*(\d+)/)?.[1] || "0"),
          unit: row.querySelector(".RUN")?.textContent?.match(/UN:\s*(\w+)/)?.[1] || "",
          unitValue: parseFloat(
            row
              .querySelector(".RvlUnit")
              ?.textContent?.match(/([\d,]+)/)?.[1]
              ?.replace(",", ".") || "0"
          ),
          totalValue: parseFloat(row.querySelector(".valor")?.textContent?.trim()?.replace(",", ".") || "0"),
        }));

        const totalItems = parseInt(document.querySelector(".totalNumb")?.textContent || "0", 10);
        const totalPrice = parseFloat(
          document.querySelector(".totalNumb.txtMax")?.textContent?.replace(",", ".") || "0"
        );

        return {
          market: { name: marketName, cnpj: marketCnpj, address: marketAddress },
          items,
          totalItems,
          totalPrice,
        };
      });

      return {
        market: {
          name: data.market.name,
          cnpj: PuppeteerAdapter.extractCnpj(data.market.cnpj),
          address: PuppeteerAdapter.clearAddress(data.market.address),
        },
        items: data.items,
        totalItems: data.totalItems,
        totalPrice: data.totalPrice,
      };
    } catch (error) {
      console.error("Erro ao realizar o scraping:", error);
      throw error;
    } finally {
      await browser.close();
    }
  }

  private static extractCnpj(text: string) {
    const cleanText = text.replace(/\s+/g, " ").trim();
    const match = cleanText.match(/CNPJ:\s*([\d./-]+)/);
    return match ? match[1] : "";
  }

  private static clearAddress(text: string) {
    const cleanText = text.replace(/[\n\t]+/g, "").trim();
    return cleanText.replace(/,\s*,+/g, ",").replace(/,\s*$/, "");
  }
}
