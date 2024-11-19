import { createApp } from "vue";
import App from "./App.vue";
import TodoHttpGateway from "./gateways/TodoHttpGateway";
import AxiosAdapter from "./infra/AxiosAdapter";
import "./style.css";

const app = createApp(App);
const httpClient = new AxiosAdapter();
const todoGatway = new TodoHttpGateway(httpClient, "http://localhost:3000");

app.provide("todoGatway", todoGatway);
app.mount("#app");
