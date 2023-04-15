<template>
  <div class="Container" :class="isDarkMode">
    <div class="InfoBox">
      <div class="Close" @click="close">&#10005;</div>
      <div class="title">請選擇其他行政區 :</div>
      <div class="PleaseChoose">
        <span class="PleaseChoose__text">請從下方選單中選擇</span>
        <div class="triangle"></div>
      </div>
      <select class="CitySelect" :class="isDarkMode" size="6">
        <option
          v-for="city in citylist"
          :key="city.cityName"
          :data-name="city.cityEngName"
          @click="chooseLocation"
        >
          {{ city.cityName }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      citylist: [
        { cityName: "基隆市", cityEngName: "Keelung City" },
        { cityName: "臺北市", cityEngName: "Taipei City" },
        { cityName: "新北市", cityEngName: "New Taipei City" },
        { cityName: "桃園市", cityEngName: "Taoyuan City" },
        { cityName: "新竹市", cityEngName: "Hsinchu City" },
        { cityName: "新竹縣", cityEngName: "Hsinchu County" },
        // { cityName: "苗栗市", cityEngName: "Miaoli City", "Miaoli"] },
        { cityName: "苗栗縣", cityEngName: "Miaoli County" },
        { cityName: "臺中市", cityEngName: "Taichung City" },
        // { cityName: "彰化市", cityEngName: "Changhua City" },
        { cityName: "彰化縣", cityEngName: "Changhua County" },
        // { cityName: "南投市", cityEngName: "Nantou City" },
        { cityName: "南投縣", cityEngName: "Nantou County" },
        { cityName: "雲林縣", cityEngName: "Yunlin County" },
        { cityName: "嘉義市", cityEngName: "Chiayi City" },
        { cityName: "嘉義縣", cityEngName: "Chiayi County" },
        { cityName: "臺南市", cityEngName: "Tainan City" },
        { cityName: "高雄市", cityEngName: "Kaohsiung City" },
        // { cityName: "屏東市", cityEngName: ["屏東", "屏東市", "Pingtung City", "Pingtung"] },
        { cityName: "屏東縣", cityEngName: "Pingtung County" },
        // { cityName: "宜蘭市", cityEngName: "Yilan City"},
        { cityName: "宜蘭縣", cityEngName: "Yilan County" },
        // { cityName: "花蓮市", cityEngName: ["花蓮", "花蓮市", "Hualien City", "Hualien"] },
        { cityName: "花蓮縣", cityEngName: "Hualien County" },
        // { cityName: "臺東市", cityEngName: ["台東", "台東市", "Taitung City", "Taitung", "臺東市", "臺東"] },
        { cityName: "臺東縣", cityEngName: "Taitung County" },
        { cityName: "澎湖縣", cityEngName: "Penghu County" },
        { cityName: "金門縣", cityEngName: "Kinmen County" },
        { cityName: "連江縣", cityEngName: "Lienchiang County" },
      ],
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.getColorMode ? "darkmode" : "lightmode";
    },
  },
  methods: {
    chooseLocation(e) {
      const cityName = e.target.getAttribute("data-name");
      if (!cityName) return;
      console.log(cityName);
      this.$store.dispatch("ManualsetLocation", cityName);
      this.$store.dispatch("changeShowMap", false);
    },
    close() {
      this.$store.dispatch("changeShowMap", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/utils/variables";
@import "../../assets/css/utils/mixins";
.Container {
  width: 30rem;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  @include iPad {
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 15;
  }

  @include ViewPort-1440 {
    display: none;
  }
}

.InfoBox {
  width: 80%;
  margin: 2rem auto;
  font-size: 4rem;
  //   background-image: none;
}

.darkmode {
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
}

.lightmode {
  @include lightmode;
  background-image: none;
}

.CitySelect {
  display: flex;
  justify-content: center;
  list-style: none;
  width: 100%;
  margin: 0 auto;
  border: none;
  //   background-image: none;
}
option {
  padding: 1rem 0;
}
option:hover {
  background-color: orange;
}

.Close {
  width: 3rem;
  height: 3rem;
  border: 1px solid gray;
  font-size: 2rem;
  border-radius: 20px;
  margin: 0 0 0 auto;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: rgb(148, 148, 148);
  }
}
</style>
