<template>
  <transition name="LoadingPage">
    <loading-page class="loadingPage" v-if="IsLoading"></loading-page>
  </transition>
  <div class="backgroundImg" :class="isDarkMode"></div>
  <div class="content">
    <div class="content__left">
      <weather-details></weather-details>
      <!-- <choose-location v-if="showMap && IsWindowWidtSmallerThan767px"></choose-location> -->
    </div>
    <div class="content__right">
      <div class="content__right__bottom">
        <transition name="map">
          <taiwan-map v-if="showMap"></taiwan-map>
        </transition>

        <transition name="select">
          <choose-location v-if="showMap"></choose-location>
        </transition>

        <!-- <test-page></test-page> -->
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from "./components/pages/AppNav.vue";
import WeatherDetails from "./components/pages/WeatherDetails.vue";
import TaiwanMap from "./components/pages/TaiwanMap.vue";

export default {
  data() {
    return {
      windowInnerWidth: window.innerWidth,
    };
  },
  components: {
    // AppNav,
    WeatherDetails,
    TaiwanMap,
  },
  computed: {
    IsWindowWidthBiggerThan1440px() {
      const windowWidth = window.innerWidth;
      // console.log(windowWidth);
      if (windowWidth < 1440) {
        console.log("smaller than 1440px");
        return false;
      } else {
        console.log("bigger than 1440px");
        return true;
      }
    },
    isDarkMode() {
      return this.$store.getters.getColorMode ? "darkmode" : "lightmode";
    },
    showMap() {
      return this.$store.getters.getShowMap;
    },
    IsLoading() {
      return this.$store.getters.getIsLoading;
    },
  },
  methods: {
    // resize() {
    //   computed(() => {
    //     return this.windowWidth;
    //   });
    // },
  },
  mounted() {
    // window.addEventListener("resize", function () {
    // this.windowInnerWidth = window.innerWidth;
    // console.log("目前瀏覽器寬度：", this.windowInnerWidth);
    // });
  },
  unmounted() {
    this.$store.dispatch("changeShowMap", false);
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
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.darkmode {
  background-image: url("./assets/background/andy-wang-O_0fiyBOY-8-unsplash.jpg");
}

.lightmode {
  background-image: url("./assets/background/Taiwan_Coast_Scenery_Moss_1920x1080.jpeg");
  // filter: brightness(0.8);
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

    @include SmallViewPort {
      width: 100%;
    }

    @include iPhoneXR {
      // position: relative;
      width: 100%;
    }

    @include iPad {
      width: 50%;
    }
    @include ViewPort-1024 {
      width: 40%;
    }
    @include ViewPort-1280 {
      width: 35%;
    }
    @include ViewPort-1440 {
      width: 30%;
    }
  }
  &__right {
    width: 70%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include SmallViewPort {
      display: none;
    }

    @include iPhoneXR {
      display: none;
    }
    @include iPad {
      display: flex;
      width: 50%;
    }
    @include ViewPort-1024 {
      width: 60%;
    }
    @include ViewPort-1280 {
      width: 65%;
    }
    @include ViewPort-1440 {
      width: 70%;
    }

    &__bottom {
      position: relative;
      width: 100%;
      height: 100%;
    }
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
  transition: all 0.35s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.select-enter-to,
.select-leave-from {
  opacity: 1;
  transform: scale(1);
}
.select-enter-active,
.select-leave-active {
  transition: all 0.35s ease-in-out;
}
</style>
