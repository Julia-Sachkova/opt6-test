<template>
  <div class="goods">
    <div class="goods__add-block">
      <button type="button" class="goods__add-btn">
        <img src="../assets/images/plus.svg" alt="плюс." />
        <span>Добавить строку</span>
      </button>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.goods {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.goods__add-block {
  padding: 20px 25px;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px var(--pale-grey);
  background-color: #fff;
}

.goods__add-btn {
  padding: 10px 15px 10px 10px;
  border-radius: 5px;
  background-color: #2f8cff;
  border: none;
  gap: 7px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.goods__add-btn img {
  width: 11px;
  height: 11px;
  background-color: transparent;
}

.goods__add-btn span {
  font-size: 14px;
  color: #fff;
}
</style>