<template>
  <draggable
    :modelValue="tableRows"
    item-key="id"
    @change="onCardDragChange"
    class="rows-drag"
    handle=".handle"
  >
    <template #item="{ element, index }">
      <UiGoodsCard :card="element" :indexNumber="index"></UiGoodsCard>
    </template>
  </draggable>
</template>

<script setup>
import { useTableStore } from "~/store/table.store";

const store = useTableStore();

const tableRows = computed(() => store.tableRows);

const onCardDragChange = (e) => {
  let newArr = JSON.parse(JSON.stringify(tableRows.value));

  if (e.moved.newIndex >= newArr.length) {
    let k = e.moved.newIndex - newArr.length + 1;
    while (k--) {
      newArr.push(undefined);
    }
  }
  newArr.splice(e.moved.newIndex, 0, newArr.splice(e.moved.oldIndex, 1)[0]);

  store.changeTableRows(newArr);
};
</script>

<style scoped></style>
