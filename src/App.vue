<template>
  <transition name="LoadingPage">
    <loading-page class="loadingPage" v-if="IsLoading"></loading-page>
  </transition>
  <div class="backgroundImg" :class="isDarkMode"></div>
  <div class="content">
    <div class="content__left">
      <weather-details></weather-details>
    </div>
    <div class="content__right">
      <div class="content__right__up">
        <app-nav></app-nav>
      </div>
      <div class="content__right__bottom">
        <transition name="map">
          <taiwan-map v-if="showMap"></taiwan-map>
        </transition>
        <!-- <test-page></test-page> -->
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from "./components/pages/AppNav.vue";
import WeatherDetails from "./components/pages/WeatherDetails.vue";
import TaiwanMap from "./components/pages/TaiwanMap.vue";

export default {
  components: {
    AppNav,
    WeatherDetails,
    TaiwanMap,
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.getColorMode ? "darkmode" : "lightmode";
    },
    showMap() {
      // console.log(this.$store.getters.get);
      return this.$store.getters.getShowMap;
    },
    IsLoading() {
      return this.$store.getters.getIsLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./src/assets/css/main.scss";

.loadingPage {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
}

.backgroundImg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.75;
  // background-image: url("./assets/background/andy-wang-O_0fiyBOY-8-unsplash.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.darkmode {
  background-image: url("./assets/background/andy-wang-O_0fiyBOY-8-unsplash.jpg");
}

.lightmode {
  background-image: url("./assets/background/Sun-Moon-Lake.jpeg");
}

.content {
  // opacity: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: row;
  // justify-content: space-around;
  align-items: center;

  &__left {
    width: 30%;
    height: 100vh;
  }
  &__right {
    width: 70%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.LoadingPage-leave-to {
  opacity: 0;
  // transform: scale(0.6);
}

.LoadingPage-leave-from {
  opacity: 1;
  // transform: scale(1);
}

.LoadingPage-leave-active {
  transition: all 1s ease-in-out;
}

.map-enter-from,
.map-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.map-enter-to,
.map-leave-from {
  opacity: 1;
  transform: scale(1);
}
.map-enter-active,
.map-leave-active {
  transition: all 0.7s ease-in-out;
}
</style>
