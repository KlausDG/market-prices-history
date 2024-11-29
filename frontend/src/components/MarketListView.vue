<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import ItemsList from "../entities/ItemsList";
import Observer from "../entities/Observer";
import MarketListComponent from "./MarketListComponent.vue";
import MarketItemsGateway from "../gateways/MarketItems/MarketItemsGateway";

const data: any = reactive({
  marketItems: new ItemsList(),
});

const marketItemsGateway = inject("marketItemsGateway") as MarketItemsGateway;

onMounted(async () => {
  const marketItems = await marketItemsGateway.getItems();

  marketItems.register(new Observer("addItem", async (item: any) => await marketItemsGateway.addItem(item)));
  marketItems.register(new Observer("removeItem", async (item: any) => await marketItemsGateway.removeItem(item)));

  data.marketItems = marketItems;
});
</script>

<template>
 <MarketListComponent :marketItems="data.marketItems" />
</template>

<style scoped></style>
