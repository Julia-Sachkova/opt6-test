<template>
  <table class="table">
    <tr class="table__header">
      <th class="table__head-cell_empty"></th>

      <th class="table__head-cell">Действие</th>

      <draggable
        :modelValue="Object.values(tableHeaderSorted)"
        item-key="id"
        @change="onColumnDragChange"
        class="table__drag-container"
      >
        <template #item="{ element, index }">
          <th
            class="table__head-cell"
            :style="[index === 'id' && { display: 'none' }]"
          >
            {{ element.name }}
          </th>
        </template>
      </draggable>
    </tr>

    <draggable
      :modelValue="tableRows"
      item-key="id"
      @change="onRowDragChange"
      class="rows-drag"
      handle=".handle"
    >
      <template #item="{ element, index }">
        <LayoutGoodsTableRow :row="element" :indexNumber="index"></LayoutGoodsTableRow>
      </template>
    </draggable>
  </table>
</template>

<script setup>
import { useTableStore } from "~/store/table.store";

const store = useTableStore();

const tableHeaderSorted = computed(() => store.tableHeaderSorted);
const tableRows = computed(() => store.tableRows);

const onRowDragChange = (e) => {
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

const onColumnDragChange = (e) => {
  let newArr = Object.keys(tableHeaderSorted.value);

  if (e.moved.newIndex >= newArr.length) {
    let k = e.moved.newIndex - newArr.length + 1;
    while (k--) {
      newArr.push(undefined);
    }
  }
  newArr.splice(e.moved.newIndex, 0, newArr.splice(e.moved.oldIndex, 1)[0]);

  let newHeader = {};

  for (let i = 0; i < newArr.length; i++) {
    newHeader[newArr[i]] = tableHeaderSorted.value[newArr[i]];
  }

  store.changeTableHeaders(newHeader);
};

store.setupTableHeaderSort()
</script>

<style scoped>
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.table__header {
  width: 100%;
  display: flex;
  flex-direction: row;
  border-top: 1px solid var(--pale-grey);
  border-bottom: 1px solid var(--pale-grey);
}

.table__head-cell {
  flex: 1;
  border-left: 1px solid var(--pale-grey);
  padding: 14px;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  min-width: 220px;
  width: 220px;
}

.table__head-cell_empty {
  width: 40px;
  min-width: 40px;
}

.rows-drag .sortable-chosen {
  border: 2px dashed #a6b7d4;
  border-radius: 5px;
}

.table__drag-container {
  display: flex;
  width: 100%;
}
</style>