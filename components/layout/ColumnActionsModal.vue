<template>
  <article class="popup" ref="target">
    <div class="popup__item">
      <span>Отображение столбцов</span>

      <img src="../../assets/images/selectArrBlack.svg" alt="открыть." />
    </div>
    <div class="popup__item">
      <span>Порядок столбцов</span>

      <img src="../../assets/images/selectArrBlack.svg" alt="открыть." />
    </div>
  </article>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["onClose"]);

const target = ref(null);

onClickOutside(target, () => emit("onClose"));
</script>

<style>
.popup {
  position: absolute;
  top: 20px;
  right: 0;
  border-radius: 5px;
  box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: #fff;
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

.popup__item:first-of-type {
  border-radius: 5px 5px 0 0;
}

.popup__item:last-of-type {
  border-radius: 0 0 5px 5px;
}

.popup__item:hover {
  background-color: #eef3f8;
}

.popup__item span {
  font-size: 14px;
  color: #161616;
  white-space: nowrap;
}

.popup__item img {
  width: 5.3px;
  height: 9px;
  background-color: transparent;
}
</style>