<template>
  <table class="table">
    <tr class="table__header">
      <th class="table__head-cell_empty"></th>

      <th class="table__head-cell">Действие</th>

      <draggable
        :modelValue="Object.values(tableHeader)"
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
        <tr class="table__row">
          <td class="table__cell_drag">
            <span class="table__index">{{ index + 1 }}</span>

            <img
              src="../assets/images/drag.svg"
              alt="перетащить."
              class="table__drag-icon handle"
            />
          </td>

          <td class="table__cell table__cell_action">
            <img
              src="../assets/images/rowMenu.svg"
              alt="действия."
              class="table__actions"
            />
          </td>
          <td
            class="table__cell"
            v-for="index in Object.keys(tableHeader)"
            :key="index"
            :style="[index === 'id' && { display: 'none' }]"
          >
            <UiInput
              v-if="tableHeader[index].control === 'input'"
              :type="tableHeader[index].type"
              v-model:value="element[index]"
            ></UiInput>

            <UiSelect
              v-else-if="tableHeader[index].control === 'lookup'"
              :options="tableHeader[index].inputData"
              v-model:value="element[index]"
            ></UiSelect>
          </td>
        </tr>
      </template>
    </draggable>
  </table>
</template>

<script setup>
import { useTableStore } from "~/store/table.store";

const store = useTableStore();

const tableHeader = computed(() => store.tableHeader);
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
  let newArr = Object.keys(tableHeader.value);

  if (e.moved.newIndex >= newArr.length) {
    let k = e.moved.newIndex - newArr.length + 1;
    while (k--) {
      newArr.push(undefined);
    }
  }
  newArr.splice(e.moved.newIndex, 0, newArr.splice(e.moved.oldIndex, 1)[0]);

  let newHeader = {};

  for (let i = 0; i < newArr.length; i++) {
    newHeader[newArr[i]] = tableHeader.value[newArr[i]];
  }

  store.changeTableHeaders(newHeader);
};
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

.table__row {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.table__cell {
  flex: 1;
  padding: 5px;
  text-align: left;
  text-overflow: ellipsis;
  min-width: 220px;
  width: 220px;
}

.table__cell_action {
  display: flex;
  align-items: center;
}

.table__cell_drag {
  width: 40px;
  min-width: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}

.table__index {
  font-size: 16px;
}

.table__drag-icon {
  width: 11px;
  height: 12px;
}

.table__actions {
  width: 3px;
  height: 13px;
  cursor: pointer;
}

.rows-drag .sortable-chosen {
  border: 2px dashed #a6b7d4;
  border-radius: 5px;
}

.table__drag-container {
  display: flex;
  width: 80.5%;
}
</style>