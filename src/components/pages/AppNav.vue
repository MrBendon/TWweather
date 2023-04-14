<template>
  <div class="navBox">
    <div class="navBox__title"></div>

    <base-button @click="toggleColorMode" v-if="checkMode" :ButtonCssName="'darkmode'">
      <img class="buttonImg" src="../../assets/icon/moon.png" alt="sun icon" />dark</base-button
    >

    <base-button @click="toggleColorMode" v-else :ButtonCssName="'lightmode'"
      ><img class="buttonImg--sun" src="../../assets/icon/sun.png" alt="moon icon" />light</base-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isDarkMode: true,
    };
  },
  computed: {
    checkMode() {
      return this.$store.getters.getColorMode;
    },
  },
  methods: {
    toggleColorMode() {
      this.$store.dispatch("changeColorMode");
    },
  },
};
</script>

<style lang="scss" scoped>
.navBox {
  display: flex;
  width: 100%;
  height: 10vh;
  flex-direction: row;
  align-items: center;
  background-color: transparent;

  &__title {
    margin: 2rem auto 2rem 2rem;
    font-size: 2.5rem;
  }
}
.buttonImg {
  width: 2rem;
  height: 2rem;
  filter: invert(100%);
  border-radius: 50%;
}
.buttonImg--sun {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
</style>
