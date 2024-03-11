<template>
  <div class="select">
    <span class="select__value">{{ props.value }}</span>

    <button class="select__btn" type="button" @click="handleOpenList">►</button>

    <ul class="select__list" v-if="openList" ref="list">
      <li
        class="select__item"
        v-for="option in props.options"
        :key="option.value"
        @click="setNewValue(option.value)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps(["value", "options"]);

const emit = defineEmits(["update:value"]);

let openList = ref(false);
const list = ref(null);

const handleOpenList = () => {
  openList.value = true;
};

const setNewValue = (val) => {
  emit("update:value", val);
  openList.value = false;
};

onClickOutside(list, (event) => (openList.value = false));
</script>

<style scoped>
.select {
  width: 100%;
  display: grid;
  grid-template-columns: 90% 10%;
  position: relative;
  padding-left: 15px;
  border-radius: 5px;
  border: solid 1px #ccc;
  background-color: #fff;
  max-width: 100%;
}

.select__value {
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px 0;
}

.select__btn {
  border: none;
  border-radius: 4px;
  background-color: var(--white);
  padding: 12px 8px;
  color: #c0c0c0;
  font-size: 7px;
  cursor: pointer;
}

.select__list {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: #fff;
  z-index: 2;
}

.select__item {
  font-size: 14px;
  text-align: left;
  color: #161616;
  padding: 7px 10px;
  cursor: pointer;
}

.select__item:first-of-type {
  border-radius: 5px 5px 0 0;
}

.select__item:last-of-type {
  border-radius: 0 0 5px 5px;
}

.select__item:hover {
  background-color: #eef3f8;
}
</style>
