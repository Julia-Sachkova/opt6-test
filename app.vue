<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";

useHead({
  title: "OTP6 test",
});

onMounted(() => {
  document.body.classList.add("dx-viewport");
});
</script>

<style>
@import url("~/assets/css/main.css");
</style>
