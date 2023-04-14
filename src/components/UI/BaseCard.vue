<template>
  <div class="Box">
    <!-- <div><slot name="date"></slot></div> -->
    <div class="ItemName"><slot>預設項目名稱</slot></div>
    <div class="ItemContent">
      <slot name="value">預設數值</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/css/utils/variables";
.Box {
  width: 60%;
  height: 6vh;
  display: flex;
  flex-direction: row;

  margin: 0rem auto;
}

.ItemName {
  text-align: left;
  margin-right: auto;
  font-size: 1.75rem;
  font-weight: $font-weight-200;
}
.ItemContent {
  text-align: right;
  font-size: 1.75rem;
  font-weight: $font-weight-200;
}
</style>
