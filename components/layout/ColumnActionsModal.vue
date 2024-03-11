<template>
  <ul class="popup" ref="target" v-if="displayList === 'display'">
    <li class="popup__item" @click="showDefaultColumns">
      <img
        src="../../assets/images/selectArrBlack.svg"
        alt="назад."
        class="popup__display-arr"
      />

      <span>Отображение столбцов</span>
    </li>
    <li
      class="popup__item popup__item_display"
      v-for="(cell, index) in tableHeader"
      :key="cell.id"
    >
      <input
        type="checkbox"
        @change="addFilter(index)"
        :checked="tableHeaderSorted[index]"
        :id="cell.name"
      />

      <label :for="cell.name">{{ cell.name }}</label>
    </li>
  </ul>

  <ul class="popup" ref="target" v-else-if="displayList === 'order'">
    <li class="popup__item" @click="showDefaultColumns">
      <img
        src="../../assets/images/selectArrBlack.svg"
        alt="назад."
        class="popup__display-arr"
      />

      <span>Порядок столбцов</span>
    </li>
    <draggable
      :modelValue="Object.values(tableHeaderSorted)"
      item-key="id"
      @change="onColumnDragChange"
    >
      <template #item="{ element }">
        <li class="popup__item">
          <span>{{ element.name }}</span>
        </li>
      </template>
    </draggable>
  </ul>

  <ul class="popup" ref="target" v-else>
    <li class="popup__item" @click="showDisplayColumns">
      <span>Отображение столбцов</span>

      <img src="../../assets/images/selectArrBlack.svg" alt="открыть." />
    </li>
    <li class="popup__item" @click="showOrderColumns">
      <span>Порядок столбцов</span>

      <img src="../../assets/images/selectArrBlack.svg" alt="открыть." />
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useTableStore } from "~/store/table.store";

const emit = defineEmits(["onClose"]);

const store = useTableStore();

const target = ref(null);
const displayList = ref("default");

const tableHeader = computed(() => store.tableHeader);
const tableHeaderSorted = computed(() => store.tableHeaderSorted);

onClickOutside(target, () => emit("onClose"));

const showDisplayColumns = () => {
  displayList.value = "display";
};

const showOrderColumns = () => {
  displayList.value = "order";
};

const showDefaultColumns = () => {
  displayList.value = "default";
};

const addFilter = (item) => {
  store.addHeaderSort(item);
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
</script>

<style>
.popup {
  position: absolute;
  top: 20px;
  right: 0;
  border-radius: 5px;
  box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: #fff;
  z-index: 1;
  list-style-type: none;
}

.popup__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
  padding: 7px 10px;
  cursor: pointer;
}

.popup__item_display {
  justify-content: flex-start;
}

.popup__item:first-of-type {
  border-radius: 5px 5px 0 0;
}

.popup__item:last-of-type {
  border-radius: 0 0 5px 5px;
}

.popup__item:hover {
  background-color: #eef3f8;
}

.popup__item label {
  font-size: 14px;
  color: #161616;
  white-space: nowrap;
  text-align: left;
}

.popup__item span {
  font-size: 14px;
  color: #161616;
  white-space: nowrap;
  text-align: left;
}

.popup__item img {
  width: 5.3px;
  height: 9px;
  background-color: transparent;
}

.popup__display-arr {
  transform: rotate(180deg);
}
</style>
