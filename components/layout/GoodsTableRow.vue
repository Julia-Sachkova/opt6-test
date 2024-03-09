<template>
    <tr class="row">
        <td class="row__cell_drag">
          <span class="row__index">{{ props.indexNumber + 1 }}</span>

          <img
            src="../../assets/images/drag.svg"
            alt="перетащить."
            class="row__drag-icon handle"
          />
        </td>

        <td class="row__cell row__cell_action">
          <img
            src="../../assets/images/rowMenu.svg"
            alt="действия."
            class="row__actions"
            @click="showDeleteRow = true"
          />

          <UiDeleteRowModal v-if="showDeleteRow" @onClose="showDeleteRow = false" @onDelete="handleDelete"></UiDeleteRowModal>
        </td>

        <div class="drag-container">
          <td
            class="row__cell"
            v-for="index in Object.keys(tableHeaderSorted)"
            :key="index"
            :style="[index === 'id' && { display: 'none' }]"
          >
            <UiInput
              v-if="tableHeaderSorted[index].control === 'input'"
              :type="tableHeaderSorted[index].type"
              v-model:value="props.row[index]"
            ></UiInput>

            <UiSelect
              v-else-if="tableHeaderSorted[index].control === 'lookup'"
              :options="tableHeaderSorted[index].inputData"
              v-model:value="props.row[index]"
            ></UiSelect>
          </td>
        </div>
      </tr>
</template>

<script setup>
import { ref } from "vue";
import { useTableStore } from "~/store/table.store";

const props = defineProps(["row", "indexNumber"]);

const store = useTableStore();

const showDeleteRow = ref(false)

const tableHeaderSorted = computed(() => store.tableHeaderSorted);

const handleDelete = () => {
  console.log(props.row.id)

  // функци удаления строки
  // для запроса использовать row.id - содержит id строки для удаления
}
</script>

<style scoped>
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.row__cell {
  flex: 1;
  padding: 5px;
  text-align: left;
  text-overflow: ellipsis;
  min-width: 220px;
  width: 220px;
}

.row__cell_action {
  display: flex;
  align-items: center;
  position: relative;
}

.row__cell_drag {
  width: 40px;
  min-width: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}

.row__index {
  font-size: 16px;
}

.row__drag-icon {
  width: 11px;
  height: 12px;
}

.row__actions {
  width: 3px;
  height: 13px;
  cursor: pointer;
}

.drag-container {
  display: flex;
  width: 100%;
}
</style>