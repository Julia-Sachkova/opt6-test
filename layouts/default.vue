<template>
  <section class="page">
    <aside class="page__menu"></aside>

    <div class="page__content">
      <h1 class="page__title">Проведение ТО и мелкий ремонт</h1>

      <LayoutTabs></LayoutTabs>

      <slot />
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

.page__menu {
  width: 15%;
  background-image: radial-gradient(circle at 29% 0, #000, #1c2734 103%);
  flex: 1;
}

.page__content {
  width: 85%;
  padding: 25px;
  background-color: #fbfcfd;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.page__title {
  font-size: 30px;
}
</style>