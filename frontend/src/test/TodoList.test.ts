import TodoList from "../entities/TodoList";

test("Deve criar uma todo list com 3 itens", () => {
  const todoList = new TodoList();

  todoList.addItem("a")
  todoList.addItem("b")
  todoList.addItem("c")

  expect(todoList.getCompleted()).toBe(0);
})

test("Deve criar uma todo list com 3 itens e 1 done", () => {
  const todoList = new TodoList();

  todoList.addItem("a")
  todoList.addItem("b")
  todoList.addItem("c")

  const a = todoList.getItem("a");

  if (a) todoList.toggleDone(a);

  expect(todoList.getCompleted()).toBe(33);
})

test("Deve criar uma todo list com 3 itens e apagar 1", () => {
  const todoList = new TodoList();

  todoList.addItem("a")
  todoList.addItem("b")
  todoList.addItem("c")

  const a = todoList.getItem("a");

  if (a) todoList.removeItem(a.id);

  expect(todoList.items).toHaveLength(2);
})