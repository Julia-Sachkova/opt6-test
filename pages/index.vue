<template>
  <div class="goods">
    <div class="goods__add-block">
      <button type="button" class="goods__add-btn" @click="addNewRow">
        <img src="../assets/images/plus.svg" alt="плюс." />
        <span>Добавить строку</span>
      </button>
    </div>

    <div class="goods__table-group">
      <div class="goods__btn-group">
        <button
          type="button"
          class="goods__settings-btn"
          @click="showColumnModal = true"
        ></button>

        <LayoutColumnActionsModal
          v-if="showColumnModal"
          @onClose="showColumnModal = false"
        ></LayoutColumnActionsModal>
      </div>

      <LayoutGoodsTable class="goods__table"></LayoutGoodsTable>

      <LayoutGoodsCardsList class="goods__cards"></LayoutGoodsCardsList>

      <LayoutGoodsTotal></LayoutGoodsTotal>

      <button
        type="button"
        class="goods__save-btn"
        :class="{ 'goods__save-btn_active': isRowsChanged }"
        @click="onSaveChange"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTableStore } from "~/store/table.store";

const store = useTableStore();

const tableRows = computed(() => store.tableRows);

const showColumnModal = ref(false);
const isRowsChanged = ref(false);

watch(
  tableRows,
  (newValue, oldValue) => {
    isRowsChanged.value = true;
  },
  { deep: true }
);

const onSaveChange = () => {
  isRowsChanged.value = false;

  console.log(tableRows.value);
  // функция для сохранения изменений строк
  // для тела запроса использовать tableRows.value
};

const addNewRow = () => {
  let newRow = {
    id: Date.now(), // эту стрку убрать, она нужна только для корректной работы без бэкенда
    unit_name: "",
    price: "",
    amount: "",
    good_name: "",
    total: "",
    weight: "",
  };

  let newArr = JSON.parse(JSON.stringify(tableRows.value));
  newArr.push(newRow);

  store.changeTableRows(newArr);
};

store.setupTableHeaderSort();
</script>

<style scoped>
.goods {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.goods__add-block {
  padding: 20px 25px;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px var(--pale-grey);
  background-color: #fff;
}

.goods__add-btn {
  padding: 10px 15px 10px 10px;
  border-radius: 5px;
  background-color: #2f8cff;
  border: none;
  gap: 7px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.goods__add-btn img {
  width: 11px;
  height: 11px;
  background-color: transparent;
}

.goods__add-btn span {
  font-size: 14px;
  color: #fff;
}

.goods__table-group {
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px var(--pale-grey);
  background-color: #fff;
  padding: 15px 0 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.goods__btn-group {
  display: block;
  position: relative;
  width: 15px;
  height: 15px;
  margin-right: 15px;
}

.goods__settings-btn {
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: none;
  background-image: url("../assets/images/settings.svg");
  background-position: center;
  cursor: pointer;
}

.goods__save-btn {
  padding: 10px;
  border-radius: 5px;
  background-color: #2f8cff;
  color: #fff;
  border: none;
  gap: 7px;
  display: flex;
  align-items: center;
  opacity: 0.5;
  margin-right: 15px;
  pointer-events: none;
}

.goods__save-btn_active {
  opacity: 1;
  cursor: pointer;
  pointer-events: auto;
}

.goods__table {
  display: flex;
}

.goods__cards {
  display: none;
}

@media screen and (max-width: 1380px) {
  .goods__btn-group {
    display: none;
  }

  .goods__table-group {
    border: none;
    background-color: transparent;
    padding: 0;
    box-shadow: none;
  }

  .goods__table {
    display: none;
  }

  .goods__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    width: 100%;
  }
}

@media screen and (max-width: 800px) {
  .goods__cards {
    grid-template-columns: 1fr;
  }
}
</style>
