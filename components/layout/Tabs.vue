<template>
  <div class="tabs">
    <NuxtLink to="/general" class="tabs__tab">Общее</NuxtLink>

    <NuxtLink to="/" class="tabs__tab">Товары</NuxtLink>

    <NuxtLink to="/add-expenses" class="tabs__tab">Доп. расходы</NuxtLink>
  </div>
</template>

<script>
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: row;
  gap: 25px;
}

.tabs__tab {
  font-size: 16px;
  font-weight: 600;
  color: #1253a2;
  text-decoration: none;
}

.router-link-active {
  color: #000;
}
</style>