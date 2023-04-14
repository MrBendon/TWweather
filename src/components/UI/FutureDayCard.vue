<template>
  <div class="Box">
    <div class="date" :class="isDarkMode">{{ oneday.shortDay }}</div>
    <div class="weatherInfo">
      <img
        v-if="LoadingFinish"
        src="../../assets/icon/2682846_cloud_cloudy_forecast_weather_night_moon.svg"
        alt=""
      />
      <!-- <img v-if="LoadingFinish" :src="getSvgURL" alt="SVG" /> -->
      <div class="text">{{ oneday.theDayWx }}</div>
    </div>
    <div class="temp">
      <span class="highest">{{ oneday.theDayHighestNum }}&#176;C</span>&nbsp;&nbsp;|&nbsp;
      <span class="lowest">{{ oneday.theDayLowestNum }}&#176;C</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    oneday: {
      type: Object,
    },
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.getColorMode ? "darkmode" : "lightmode";
    },
    LoadingFinish() {
      return this.$store.getters.getIsLoading ? false : true;
    },
    getSvgURL() {
      if (this.$store.getters.getIsLoading) {
        return "../../assets/useSVG/clear__day.svg";
      } else {
        const Wx = this.oneday.theDayWxEng;
        let DayOrNight = "";
        if (!this.$store.getters.getToday.isNight) {
          DayOrNight = "day";
        } else {
          DayOrNight = "night";
        }
        return require(`../../assets/useSVG/${Wx}__${DayOrNight}.svg`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/utils/variables";
.Box {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8vh;
  margin: 0rem auto;
  justify-content: space-around;
  align-items: center;
}

.darkmode {
  background-color: rgb(137, 136, 136);
}

.lightmode {
  background-color: rgb(211, 211, 211);
}

.date {
  //   display: inline-flex;
  width: 6rem;
  height: 2.25rem;
  font-size: 1.5rem;
  border-radius: 20px;
  text-align: center;
}

.weatherInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  & > img {
    width: 4rem;
  }
}

.text {
  width: 12rem;
  margin-left: 1.5rem;
  font-size: 1.5rem;
}

.temp {
  margin: 0 0 0 1rem;
  text-align: center;
}

.highest {
  font-size: 1.5rem;
  color: rgba(245, 132, 132);
}
.lowest {
  font-size: 1.5rem;
  color: rgb(140, 210, 254);
}
</style>
