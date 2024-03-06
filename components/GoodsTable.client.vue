<template>
  <DxDataGrid
    :data-source="rows"
    :show-borders="false"
    :allow-column-resizing="true"
    :allow-column-reordering="true"
    :column-auto-width="true"
    :column-resizing-mode="'nextColumn'"
  >
    <DxRowDragging
      :allow-reordering="true"
      :on-reorder="onReorder"
      :show-drag-icons="true"
      drop-feedback-mode="push"
    />
    <DxColumn data-field="" cell-template="number-cell-template" width="25" />
    <DxColumn
      data-field="Действие"
      cell-template="actions-cell-template"
      width="75"
    />
    <DxColumn
      v-for="column in tableHeader"
      :data-field="column.id"
      :caption="column.name"
      :key="column.id"
    />

    <template #number-cell-template="{ data: templateOptions }">
      {{ templateOptions.rowIndex + 1 }}
    </template>
    <template #actions-cell-template>
      <img
        src="../assets/images/rowMenu.svg"
        alt="действия."
        class="table__actions"
      />
    </template>
  </DxDataGrid>
</template>
  
<script setup>
import { ref } from "vue";

import "devextreme/dist/css/dx.light.css";
import { tableHeader, tableRows } from "~/components/layout/table.data";
import { DxDataGrid, DxColumn, DxRowDragging } from "devextreme-vue/data-grid";

const rows = ref(tableRows);

const onReorder = (e) => {
  const visibleRows = e.component.getVisibleRows();
  const toIndex = rows.value.findIndex(
    (item) => item.id === visibleRows[e.toIndex].data.id
  );
  const fromIndex = rows.value.findIndex((item) => item.id === e.itemData.id);
  const newRows = [...rows.value];

  newRows.splice(fromIndex, 1);
  newRows.splice(toIndex, 0, e.itemData);

  rows.value = newRows;
};
</script>
  
<style>
.table__actions {
  width: 3px;
  height: 13px;
  background-color: transparent;
}

.dx-datagrid-drag-icon {
  background-image: url("../assets/images/drag.svg");
  background-position: center;
  background-size: cover !important;
  background-repeat: no-repeat;
  display: block !important;
  width: 11px !important;
  height: 12px !important;
  margin-left: 10px;
}

.dx-datagrid-drag-icon::before {
  content: "" !important;
}
</style>