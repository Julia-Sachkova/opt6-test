<template>
  <div class="total">
    <ul class="total__container">
      <li class="total__group">
        <span class="total__title">Сумма:</span>

        <span class="total__text">{{ sum.toLocaleString() }} руб</span>
      </li>

      <li class="total__group">
        <span class="total__title">Кол-во:</span>

        <span class="total__text">{{ amount.toLocaleString() }} шт</span>
      </li>

      <li class="total__group">
        <span class="total__title">Общий вес:</span>

        <span class="total__text">{{ weight.toLocaleString() }} кг</span>
      </li>
    </ul>

    <ul class="total__container">
      <li class="total__group">
        <span class="total__title total__title_b">Общая сумма:</span>

        <span class="total__text total__text_b"
          >{{ sum.toLocaleString() }} руб</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTableStore } from "~/store/table.store";

const store = useTableStore();

const tableRows = computed(() => store.tableRows);

const sum = computed(() => {
  const sum = tableRows.value.reduce(
    (accumulator, currentValue) =>
      Number(accumulator) + Number(currentValue.total),
    0
  );

  return sum;
});

const amount = computed(() => {
  const sum = tableRows.value.reduce(
    (accumulator, currentValue) =>
      Number(accumulator) + Number(currentValue.amount),
    0
  );

  return sum;
});

const weight = computed(() => {
  const sum = tableRows.value.reduce(
    (accumulator, currentValue) =>
      Number(accumulator) + Number(currentValue.weigth),
    0
  );

  return sum;
});

const totalSum = computed(() => {
  const sum = tableRows.value.reduce(
    (accumulator, currentValue) =>
      Number(accumulator) + Number(currentValue.total),
    0
  );

  return sum;
});
</script>

<style scoped>
.total {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 305px;
  max-width: 100%;
}

.total__container {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 5px;
  border: solid 1px var(--pale-grey);
  background-color: #fbfcfd;
  gap: 15px;
  list-style-type: none;
}

.total__group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.total__title {
  font-size: 14px;
  color: #8f8f8f;
}

.total__title_b {
  color: #000;
}

.total__text {
  font-size: 14px;
  color: #000;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.total__text_b {
  font-weight: 600;
}

@media screen and (max-width: 520px) {
  .total {
    width: 100%;
  }
}
</style>
