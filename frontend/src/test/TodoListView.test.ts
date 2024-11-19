import { mount } from "@vue/test-utils";
import TodoListView from "../components/TodoListView.vue";
import TodoMemoryGateway from "../gateways/TodoMemoryGateway";

const sleep = (mili: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, mili)
  })
} 

test("Deve testar a tela de todo list", async () => {
  const todoGateway = new TodoMemoryGateway();
  const wrapper = mount(TodoListView, {
    global: {
      provide: {
        todoGateway
      }
    }
  })
  await sleep(100)

  expect(wrapper.get(".completed").text()).toBe("33%")
});
