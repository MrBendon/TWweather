<template>
  <div class="weatherSummary">
    <!-- <img v-if="!LoadingFinish" class="SummaryIcon" src="../../assets/useSVG/clear__day.svg" alt="SVG" /> -->
    <img v-if="LoadingFinish" class="SummaryIcon" :src="returnURL" alt="SVG" />
    <!-- <img class="SummaryIcon" src="../../assets/useSVG/clear__night.svg" alt="" /> -->
    <div class="text">{{ getWx }}</div>
  </div>
</template>

<script>
export default {
  methods: {},
  computed: {
    LoadingFinish() {
      return this.$store.getters.getIsLoading ? false : true;
    },
    returnURL() {
      if (this.$store.getters.getIsLoading) {
        return "../../assets/useSVG/clear__day.svg";
      } else {
        const Wx = this.$store.getters["WeatherModule/getUserLocationData"].Wx;
        let DayOrNight = "";
        if (!this.$store.getters.getToday.isNight) {
          DayOrNight = "day";
        } else {
          DayOrNight = "night";
        }
        return require(`../../assets/useSVG/${Wx}__${DayOrNight}.svg`);
      }
    },
    getWx() {
      return this.$store.getters["WeatherModule/getUserLocationData"].Wx;
    },
    getIconSvgDayOrNight() {
      if (!this.$store.getters.getToday.isNight) {
        return "day";
      } else {
        return "night";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/utils/variables";
.weatherSummary {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.SummaryIcon {
  width: 5rem;
  height: 5rem;
  // transform: translateY(0.5vh);
}

.text {
  width: 8rem;
  font-size: 1.5rem;
  font-weight: $font-weight-200;
  text-align: center;
}
</style>
