<template>
  <article class="delete" ref="delete">Удалить</article>
</template>
  
<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["onClose". "onDelete"]);

const delete = ref(null);

onClickOutside(delete, () => (emit('onClose')));

const onDelete = () => {
    emit('onDelete')
}
</script>
  
<style scoped>
.delete {
  position: absolute;
  top: 15px;
  left: 15px;
  border-radius: 5px;
  box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: #fff;
  z-index: 2;
  padding: 7px 10px;
  font-size: 10px;
  color: #8f8f8f;
}
</style>