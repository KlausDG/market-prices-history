<script setup lang="ts">
import { ref } from "vue";

defineProps(["marketItems"]);
const description = ref("");
const price = ref("");
</script>

<template>
  <div v-if="marketItems?.items?.length === 0">No Item</div>
  <div v-else>
    <div v-for="item in marketItems?.items">
      <span class="market_item">{{ item.description }}</span>
      <button @click="marketItems.removeItem(item)">Remove</button>
    </div>
  </div>
  <input type="text" v-model="description"/>
  <input type="text" v-model="price"/>
  <button @click="marketItems.addItem(price)">Add</button>
</template>

<style scoped></style>
