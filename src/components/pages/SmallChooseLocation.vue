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
          @touchend.prevent="chooseLocation"
        >
          {{ city.cityName }}
        </option>
      </select>
      <div @touchend.prevent="ChangeCity" class="Submit" :class="isDarkMode">Submit</div>
    </div>
  </div>
</template>
<!-- -->
<script>
export default {
  data() {
    return {
      UserChooseCity: "",
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
    ChangeCity(e) {
      // this.UserChooseCity = cityName;
      e.preventDefault();
      console.log(this.UserChooseCity);
      this.$store.dispatch("ManualsetLocation", this.UserChooseCity);
      this.$store.dispatch("changeShowMap", false);
      // console.log(1);
    },
    chooseLocation(e) {
      e.preventDefault();
      // console.log(this.UserChooseCity);
      const cityName = e.target.getAttribute("data-name");
      if (!cityName) return;
      this.UserChooseCity = cityName;
      // console.log(cityName);
      // console.log(this.UserChooseCity);
      // this.$store.dispatch("ManualsetLocation", cityName);
      // this.$store.dispatch("changeShowMap", false);
    },
    close() {
      //   const nowBoolean = this.$store.getters.getShowMap;
      // console.log(nowBoolean);
      this.$store.dispatch("changeShowMap", false);
    },
  },
  mounted() {
    this.UserChooseCity = "";
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/utils/variables";
@import "../../assets/css/utils/mixins";
.Container {
  //   position: absolute;
  //   top: 50%;

  width: 30rem;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  //   background-image: none;

  @include SmallViewPort {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    z-index: 15;
  }

  //   @include iPhoneXR {
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //     display: flex;
  //     z-index: 15;
  //   }

  @include iPad {
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
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid white;
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
  margin: 1rem 0 0 0;
}

select {
  border: none;
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

.Submit {
  display: block;
  margin: 1rem auto;
  border: 1px solid grey;
  border-radius: 20px;
  width: 8rem;
  height: 3rem;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
}
</style>
