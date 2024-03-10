<template>
  <section class="page">
    <aside class="page__menu"></aside>

    <div class="page__content">
      <div class="page__top">
        <button class="page__menu-btn" type="button"></button>
        <h1 class="page__title">Проведение ТО и мелкий ремонт</h1>
      </div>

      <LayoutTabs></LayoutTabs>

      <slot />
    </div>
  </section>
</template>

<script setup></script>

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

.page__top {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 25px;
}

.page__title {
  font-size: 30px;
  line-height: normal;
}

.page__menu-btn {
  display: none;
}

@media screen and (max-width: 520px) {
  .page__menu {
    display: none;
  }

  .page__content {
    width: 100%;
    padding: 16px 10px;
  }

  .page__menu-btn {
    display: block;
    width: 15px;
    height: 12px;
    border: none;
    background-color: transparent;
    background-image: url("../assets/images/drag.svg");
    cursor: pointer;
    margin-top: 9px;
  }
}
</style>
