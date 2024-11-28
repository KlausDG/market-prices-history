import ItemsList from "../entities/ItemsList";

test("Deve criar uma item list com 3 itens", () => {
  const itemsList = new ItemsList();

  itemsList.addItem("a", 1);
  itemsList.addItem("b", 2);
  itemsList.addItem("c", 3);

  expect(itemsList.items.length).toBe(3);
});

test("Deve criar uma items list com 3 itens e apagar 1", () => {
  const itemsList = new ItemsList();

  itemsList.addItem("a", 1);
  itemsList.addItem("b", 2);
  itemsList.addItem("c", 3);

  const a = itemsList.getItem("a");

  if (a) itemsList.removeItem(a.id);

  expect(itemsList.items).toHaveLength(2);
});
