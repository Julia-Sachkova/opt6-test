<template>
  <ul class="list">
    <li v-for="(item, index) in tableRows" :key="item.id">
      <UiGoodsCard :card="item" :indexNumber="index"></UiGoodsCard>
    </li>
  </ul>
</template>

<script setup>
import { useTableStore } from "~/store/table.store";

const store = useTableStore();

const tableRows = computed(() => store.tableRows);
</script>

<style scoped>
.list {
  list-style-type: none;
}
</style>
