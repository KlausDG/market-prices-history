import { createApp } from "vue";
import App from "./App.vue";
import { QrCodeScannerService } from "./application/services/QrCodeScannerService";
import MarketItemsHttpGateway from "./gateways/MarketItems/MarketItemsHttpGateway";
import ReceiptHttpGateway from "./gateways/Receipt/ReceiptHttpGateway";
import AxiosAdapter from "./infra/AxiosAdapter";
import { Html5QrCodeAdapter } from "./infra/Html5QrCodeAdapter";
import "./style.css";

const baseUrl = "http://localhost:3000";

const app = createApp(App);

const httpClient = new AxiosAdapter();
const marketItemsHttpGateway = new MarketItemsHttpGateway(httpClient, baseUrl);
const receiptHttpGateway = new ReceiptHttpGateway(httpClient, baseUrl);

const qrCodeScanner = new Html5QrCodeAdapter();
const qrCodeScannerService = new QrCodeScannerService(qrCodeScanner);

app.provide("marketItemsGateway", marketItemsHttpGateway);
app.provide("receiptHttpGateway", receiptHttpGateway);
app.provide("qrCodeScanner", qrCodeScannerService);
app.mount("#app");
