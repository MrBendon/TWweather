<template>
  <div>
    <button :class="ButtonCssName"><slot>Default Button Name</slot></button>
  </div>
</template>

<script>
export default {
  props: {
    ButtonCssName: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/utils/variables";
@import "../../assets/css/utils/mixins";

button,
a {
  //   width: 6rem;
  //   height: 2rem;
  // background-color: rgb(189, 189, 189, 0.5);
  border: none;
  border-radius: 24px;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  transition: all 0.25s;
  // transition-delay: 0.25s;

  &:hover {
    // background-color: rgb(189, 189, 189);
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
}

.darkmode {
  font-size: 1.75rem;
  width: 8rem;
  height: 3rem;
  @include darkmode;
  margin-right: 4rem;
  //   color: $darkmode-font-color;
}

.lightmode {
  font-size: 1.75rem;
  width: 8rem;
  height: 3rem;
  @include lightmode;
  margin-right: 4rem;
  background-image: none;
}
</style>
