<template>
  <div class="background" :class="isDarkMode">
    <div class="chooseLocationBox">
      <img
        class="chooseLocation"
        :class="iconIsDarkMode"
        src="../../assets/icon/location.png"
        alt="location icon"
        @click="toggleMap"
      />
      <span v-if="!isShowMap" @click="toggleMap" class="chooseLocation__text">點擊查看其他行政區天氣</span>
      <span v-else @click="toggleMap" class="chooseLocation__text">再次點擊可收回</span>
      <app-nav class="toggleColorBtn"></app-nav>
    </div>
    <div class="detailsBox">
      <transition name="select">
        <small-choose-location v-if="isShowMap"></small-choose-location>
      </transition>
      <div class="upperBox">
        <span class="temperature">
          {{ getTemperature }}
          <span class="deg">&#176;C</span>
        </span>
        <div class="locationAndDate">
          <div class="locationName">{{ getCityName }}</div>
          <div class="Date">{{ getDate }}&nbsp; {{ getDay }}</div>
        </div>
        <base-small-icon-card></base-small-icon-card>
      </div>
      <div class="middle">
        <base-card>
          <template #default>體感溫度</template>
          <template #value>{{ getAT }} °C</template>
        </base-card>
        <base-card>
          <template #default>風速</template>
          <template #value>{{ getWS }} m/s</template>
        </base-card>
        <base-card>
          <template #default>降雨機率</template>
          <template #value>{{ getRR }} %</template>
        </base-card>
      </div>
      <div class="line"></div>
      <ul class="bottom">
        <future-day-card
          v-for="oneday in getFutureDaydata"
          :key="oneday.theDayFirstValue.startTime"
          :oneday="oneday"
        ></future-day-card>
      </ul>
    </div>
  </div>
</template>

<script>
import AppNav from "./AppNav.vue";
export default {
  components: {
    AppNav,
  },
  computed: {
    isShowMap() {
      return this.$store.getters.getShowMap;
    },

    iconIsDarkMode() {
      return this.$store.getters.getColorMode
        ? "chooseLocationIcon--darkmode"
        : "chooseLocationIcon--lightmode";
    },
    isDarkMode() {
      return this.$store.getters.getColorMode ? "darkmode" : "lightmode";
    },
    getCityName() {
      return this.$store.getters.getUserCity;
    },
    getDate() {
      return this.$store.getters.getToday.month + "/" + this.$store.getters.getToday.date;
    },
    getDay() {
      return this.$store.getters.getToday.day;
    },
    getTemperature() {
      return this.$store.getters["WeatherModule/getUserLocationData"].T;
    },
    getAT() {
      return this.$store.getters["WeatherModule/getUserLocationData"].AT;
    },
    getWS() {
      return this.$store.getters["WeatherModule/getUserLocationData"].WS;
    },
    getRR() {
      return this.$store.getters["WeatherModule/getUserLocationData"].RR;
    },
    getFutureDaydata() {
      return this.$store.getters["WeatherModule/getFutureDayData"];
    },
    getDayName() {
      return this.$store.getters.getFutureDay;
    },
  },
  methods: {
    toggleMap() {
      const nowBoolean = this.$store.getters.getShowMap;
      this.$store.dispatch("changeShowMap", !nowBoolean);
    },
  },
  async created() {
    await this.$store.dispatch("getUserLocation"); //有位子了
    await this.$store.dispatch("WeatherModule/fetchData"); // 有數據了
    await this.$store.dispatch("getDate"); // 取得時間
    await this.$store.getters["WeatherModul/getUserLocationTodayData"];
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/css/utils/_variables.scss";
@import "./src/assets/css/utils/_mixins.scss";
.background {
  display: flex;
  width: 100%;
  height: 100%;

  // color: $darkmode-font-color;
  flex-direction: column;
  z-index: 2;
}

.darkmode {
  color: $darkmode-font-color;
  background-color: rgb(0, 0, 0, 0.8);
}

.lightmode {
  color: $lightmode-font-color;
  background-image: none;
  background-color: rgb(255, 255, 255, 0.9);
}

.chooseLocationBox {
  display: flex;
  // flex: 0 0 10%;
  width: 100%;
  padding: 0 2rem;
  align-items: center;
  font-size: 2.5rem;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
}

.chooseLocation {
  width: 4rem;
  height: 4rem;
  filter: invert(1);
  //   margin-right: 1rem;
  cursor: pointer;

  &__text {
    cursor: pointer;
    padding: 1rem;
  }
}

.toggleColorBtn {
  margin-left: auto;
}

.chooseLocationIcon--darkmode {
  filter: invert(1);
}
.chooseLocationIcon--lightmode {
  filter: invert(0);
}

.detailsBox {
  flex: 1 0 90%;
}
.upperBox {
  display: flex;
  flex-direction: row;
  height: 18vh;
  padding-bottom: 2vh;
  justify-content: center;
  align-items: flex-end;
}

.temperature {
  font-size: 8rem;
  margin-right: 0.5rem;
  line-height: 0.8;
  word-spacing: -1.5rem;
}

.deg {
  // display: inline-block;
  vertical-align: top;
  font-size: 2rem;
  // line-height: 2.5rem;
}
.locationAndDate {
  font-size: 4.5rem;
  margin-right: 1rem;

  @include iPhoneXR {
    font-size: 4rem;
  }
}
.Date {
  font-size: 1.5rem;
  font-weight: $font-weight-200;

  @include iPhoneXR {
    font-size: 1.25rem;
  }
}

.middle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  height: 25%;
  margin: 3rem auto 0 auto;
  //   padding: 2rem 0;
}

.line {
  margin: 0 auto;
  width: 80%;
  height: 1px;
  border: 0.5px solid grey;
}

.bottom {
  width: 80%;
  height: 40%;
  margin: 2rem auto 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.select-enter-to,
.select-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.select-enter-active,
.select-leave-active {
  transition: all 0.35s ease-in-out;
}
</style>
