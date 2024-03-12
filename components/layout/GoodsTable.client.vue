<template>
  <table class="table">
    <draggable
      :modelValue="Object.values(tableHeaderSorted)"
      item-key="id"
      @change="onColumnDragChange"
      class="table__header"
      handle=".handle"
    >
      <template #item="{ element, index }">
        <th
          class="table__head-cell"
          :class="[
            { 'table__head-cell_empty': element.control === 'index' },
            element.id,
          ]"
        >
          <div class="table__head-cell-content handle">
            <span v-if="element.control === 'action'">Действие</span>

            <span v-else-if="element.control !== 'index'">
              {{ element.name }}
            </span>
          </div>

          <div class="drag" @mousedown="drag"></div>
        </th>
      </template>
    </draggable>

    <draggable
      :modelValue="tableRows"
      item-key="id"
      @change="onRowDragChange"
      class="rows-drag"
      handle=".handle"
    >
      <template #item="{ element, index }">
        <LayoutGoodsTableRow
          :row="element"
          :indexNumber="index"
        ></LayoutGoodsTableRow>
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

const drag = (evt) => {
  let dragX = evt.clientX;
  let block = evt.target.parentElement;

  let curEls = document.querySelectorAll(`
    .${block.classList[block.classList.length - 1]}
  `);

  console.log(curEls);
  console.log(block.classList[block.classList.length - 1]);

  document.onmousemove = function onMouseMove(e) {
    for (const el of curEls) {
      el.style.width = el.offsetWidth + e.clientX - dragX + "px";
      el.style.flex = "none";
    }
    dragX = e.clientX;
  };
  // remove mouse-move listener on mouse-up
  document.onmouseup = () => (document.onmousemove = document.onmouseup = null);
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
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  min-width: 30px;
  width: 220px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
}

.table__head-cell-content {
  padding: 14px;
}

.drag {
  position: absolute;
  right: 0;
  width: 2px;
  height: 100%;
  background-color: var(--pale-grey);
  cursor: col-resize;
}

.table__head-cell_empty {
  width: 40px;
  min-width: 40px;
  flex: 0;
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
