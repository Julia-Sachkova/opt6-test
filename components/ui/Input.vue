<template>
  <input class="input" :type="props.type" :value="value" @input="updateInput" />
</template>
    
<script setup>
const props = defineProps(["value", "type"]);

const emit = defineEmits(["update:value"]);

const updateInput = (evt) => {
  emit("update:value", evt.target.value);
};
</script>
    
<style scoped>
.input {
  width: 100%;
  height: 35px;
  color: #000;
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 5px;
  border: solid 1px #ccc;
}

.input:focus-visible {
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>