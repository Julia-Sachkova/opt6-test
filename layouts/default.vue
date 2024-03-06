<template>
  <section class="page">
    <aside class="page__menu"></aside>

    <div class="page__content">
      <h1 class="page__title">Проведение ТО и мелкий ремонт</h1>

      <div class="page__top">
        <LayoutTabs></LayoutTabs>

        <div class="page__btn-group" v-if="route.name === 'index'">
          <button
            type="button"
            class="page__settings-btn"
            @click="showColumnModal = true"
          ></button>

          <LayoutColumnActionsModal
            v-if="showColumnModal"
            @onClose="showColumnModal = false"
          ></LayoutColumnActionsModal>
        </div>
      </div>

      <slot />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";

const route = useRoute();

const showColumnModal = ref(false);
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

.page__menu {
  width: 11%;
  background-image: radial-gradient(circle at 29% 0, #000, #1c2734 103%);
  flex: 1;
}

.page__content {
  width: 89%;
  padding: 25px;
  background-color: #fbfcfd;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.page__title {
  font-size: 30px;
}

.page__top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.page__btn-group {
  position: relative;
}

.page__settings-btn {
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: none;
  background-image: url("../assets/images/settings.svg");
  cursor: pointer;
}
</style>