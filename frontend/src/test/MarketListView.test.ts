import { mount } from "@vue/test-utils";
import MarketListView from "../components/MarketListView.vue";
import MarketItemsMemoryGateway from "../gateways/MarketItemsMemoryGateway";

const sleep = (mili: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, mili);
  });
};

test("Deve testar a tela de market list", async () => {
  const marketItemsGateway = new MarketItemsMemoryGateway();
  const wrapper = mount(MarketListView, {
    global: {
      provide: {
        marketItemsGateway,
      },
    },
  });
  await sleep(100);

  const marketItems = wrapper.findAll(".market_item");

  expect(marketItems.length).toBe(3);
});
