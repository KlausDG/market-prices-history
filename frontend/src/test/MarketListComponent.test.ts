import { mount } from "@vue/test-utils";
import MarketListComponent from "../components/MarketListComponent.vue";
import ItemsList from "../entities/ItemsList";

const sleep = (mili: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, mili);
  });
};

test("Deve testar o componente de market list", async () => {
  const itemsList = new ItemsList();
  itemsList.addItem("a", 1);
  itemsList.addItem("b", 2);
  itemsList.addItem("c", 3);

  const wrapper = mount(MarketListComponent, {
    props: { marketItems: itemsList },
  });
  await sleep(100);

  const marketItems = wrapper.findAll(".market_item");

  expect(marketItems.length).toBe(3);
});
