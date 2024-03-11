<template>
  <draggable
    :modelValue="Object.values(tableHeaderSorted)"
    item-key="id"
    @change="onRowDragChange"
    class="card"
    handle=".handle"
    tag="ul"
  >
    <template #item="{ element, index }">
      <li class="card__item">
        <img
          src="../../assets/images/drag.svg"
          alt="перетащить."
          class="card__drag-icon handle"
        />

        <div class="card__content">
          <label class="card__label">
            {{ element.name }}
          </label>

          <UiInput
            v-if="element.control === 'input'"
            :type="element.type"
            v-model:value="props.card[element.id]"
          ></UiInput>

          <UiSelect
            v-else-if="element.control === 'lookup'"
            :options="element.inputData"
            v-model:value="props.card[element.id]"
          ></UiSelect>

          <span class="card__index" v-else-if="element.control === 'index'">
            {{ props.indexNumber + 1 }}
          </span>

          <div
            class="card__item-group card__item-group_action"
            v-else-if="element.control === 'action'"
          >
            <img
              src="../../assets/images/rowMenu.svg"
              alt="действия."
              class="card__actions"
              @click="showDeleteCard = true"
            />

            <UiDeleteRowModal
              v-if="showDeleteCard"
              @onClose="showDeleteCard = false"
              @onDelete="handleDelete"
            ></UiDeleteRowModal>
          </div>
        </div>
      </li>
    </template>
  </draggable>
</template>

<script setup>
import { ref } from "vue";
import { useTableStore } from "~/store/table.store";

const props = defineProps(["card", "indexNumber"]);

const store = useTableStore();

const showDeleteCard = ref(false);

const tableHeaderSorted = computed(() => store.tableHeaderSorted);

const handleDelete = () => {
  console.log(props.card.id);

  // функци удаления карточки
  // для запроса использовать card.id - содержит id строки для удаления
};

const onRowDragChange = (e) => {
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

<style scoped>
.card {
  width: 100%;
  padding: 15px 15px 25px;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px var(--pale-grey);
  background-color: #fff;
  list-style-type: none;
  gap: 15px;
  display: flex;
  flex-direction: column;
}

.card__item {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.card__content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.card__label {
  font-family: MyriadPro;
  font-size: 10px;
  color: #8f8f8f;
}

.card__index {
  font-size: 16px;
}

.card__drag-icon {
  width: 11px;
  height: 12px;
  cursor: pointer;
  opacity: 0;
}

.card__item:hover .card__drag-icon {
  opacity: 1;
}

.card__actions {
  width: 3px;
  height: 13px;
  cursor: pointer;
}

.card__item-group {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

.card__item-group_action {
  position: relative;
}

.card .sortable-chosen {
  border: 2px dashed #a6b7d4;
  border-radius: 5px;
}
</style>
