<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import TodoGateway from "../gateways/TodoGateway";
import TodoList from "../entities/TodoList";
import Observer from "../entities/Observer";
import TodoListComponent from "./TodoListComponent.vue";

const data: any = reactive({
  todoList: new TodoList(),
});

const todoGateway = inject("todoGateway") as TodoGateway;

onMounted(async () => {
  const todoList = await todoGateway.getTodos();

  todoList.register(new Observer("addItem", async (item: any) => await todoGateway.addItem(item)));
  todoList.register(new Observer("toggleDone", async (item: any) => await todoGateway.updateItem(item)));
  todoList.register(new Observer("removeItem", async (item: any) => await todoGateway.removeItem(item)));

  data.todoList = todoList;
});
</script>

<template>
 <TodoListComponent :todoList="data.todoList" />
</template>

<style scoped></style>
