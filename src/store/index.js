import { createStore } from "vuex";
import WeatherModule from "./weather/WeatherStore.js";

export default createStore({
  modules: { WeatherModule: WeatherModule },
  state() {
    return {
      isDarkMode: false,
      UserCity: "",
      UserCityStandardize: "",
      isLoading: false,
      showMap: false,
      Today: {
        month: Number,
        date: Number,
        day: String,
        hours: Number,
        isNight: Boolean,
      },
      FutureDay: {},
    };
  },
  actions: {
    changeShowMap(context, payload) {
      context.commit("changeShowMap", payload);
    },
    toggleIsLoading(context, payload) {
      context.commit("toggleIsLoading", payload);
    },
    getDate(context) {
      const nowTimeStamp = Date.now();
      const DateObject = new Date(nowTimeStamp);
      const Month = DateObject.getMonth() + 1;
      const TodayDate = DateObject.getDate();
      const TodayDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(DateObject);
      // console.log(Month, TodayDate, TodayDay);
      const Hours = DateObject.getHours();
      context.commit("setToday", { Month, TodayDate, TodayDay, Hours });
      function calcFutureDay(daypass) {
        const newDayTimeStamp = nowTimeStamp + 1000 * 60 * 60 * 24 * daypass;
        const newDayObject = new Date(newDayTimeStamp);
        const shortDay = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(newDayObject);
        const Year = newDayObject.getFullYear();
        let Month = newDayObject.getMonth() + 1;
        let TheDate = newDayObject.getDate();
        if (Month < 10) {
          Month = "0" + Month;
        }
        if (TheDate < 10) {
          TheDate = "0" + TheDate;
        }
        const FullDate = Year + "-" + Month + "-" + TheDate;
        // console.log(shortDay, FullDate);
        return { shortDay, FullDate };
      }

      const Day2 = calcFutureDay(1);
      const Day3 = calcFutureDay(2);
      const Day4 = calcFutureDay(3);
      // console.log(Day2, Day3, Day4);
      context.commit("setFutureDay", { Day2, Day3, Day4 });
    },
    async locationCityStandardize(context, oldcityName) {
      const locationNameCategoryTable = [
        { cityName: "基隆市", otherName: ["基隆", "基隆市", "Keelung City", "Keelung"] },
        { cityName: "臺北市", otherName: ["台北", "台北市", "Taipei City", "Taipei", "臺北市", "臺北"] },
        { cityName: "新北市", otherName: ["新北", "新北市", "New Taipei City", "new taipei city"] },
        { cityName: "桃園市", otherName: ["桃園", "桃園市", "Taoyuan City", "Taoyuan"] },
        { cityName: "新竹市", otherName: ["新竹", "新竹市", "Hsinchu City", "Hsinchu"] },
        { cityName: "新竹縣", otherName: ["新竹縣", "Hsinchu County"] },
        { cityName: "苗栗市", otherName: ["苗栗", "苗栗市", "Miaoli City", "Miaoli"] },
        { cityName: "苗栗縣", otherName: ["苗栗縣", "Miaoli County"] },
        { cityName: "臺中市", otherName: ["台中", "台中市", "Taichung City", "Taichung", "臺中市", "臺中"] },
        { cityName: "彰化市", otherName: ["彰化", "彰化市", "Changhua City", "Changhua"] },
        { cityName: "彰化縣", otherName: ["彰化縣", "Changhua County"] },
        { cityName: "南投市", otherName: ["南投", "南投市", "Nantou City", "Nantou"] },
        { cityName: "南投縣", otherName: ["南投縣", "Nantou County"] },
        { cityName: "雲林縣", otherName: ["雲林", "雲林縣", "Yunlin County"] },
        { cityName: "嘉義市", otherName: ["嘉義", "嘉義市", "Chiayi City", "Chiayi"] },
        { cityName: "嘉義縣", otherName: ["嘉義縣", "Chiayi County"] },
        { cityName: "臺南市", otherName: ["台南", "台南市", "Tainan City", "Tainan", "臺南市", "臺南"] },
        { cityName: "高雄市", otherName: ["高雄", "高雄市", "Kaohsiung City", "Kaohsiung"] },
        { cityName: "屏東市", otherName: ["屏東", "屏東市", "Pingtung City", "Pingtung"] },
        { cityName: "屏東縣", otherName: ["屏東縣", "Pingtung County"] },
        { cityName: "宜蘭市", otherName: ["宜蘭", "宜蘭市", "Yilan City", "Yilan"] },
        { cityName: "宜蘭縣", otherName: ["宜蘭縣", "Yilan County"] },
        { cityName: "花蓮市", otherName: ["花蓮", "花蓮市", "Hualien City", "Hualien"] },
        { cityName: "花蓮縣", otherName: ["花蓮縣", "Hualien County"] },
        { cityName: "臺東市", otherName: ["台東", "台東市", "Taitung City", "Taitung", "臺東市", "臺東"] },
        { cityName: "臺東縣", otherName: ["台東縣", "Taitung County", "臺東縣"] },
        { cityName: "澎湖縣", otherName: ["澎湖", "澎湖縣", "Penghu County"] },
        { cityName: "金門縣", otherName: ["金門", "金門縣", "Kinmen County"] },
        { cityName: "連江縣", otherName: ["連江", "連江縣", "Lienchiang County", "馬祖"] },
      ];

      const StandardizedCityName = locationNameCategoryTable.find((obj) =>
        obj.otherName.includes(`${oldcityName}`)
      ).cityName;
      // console.log(StandardizedCityName);
      context.commit("setStandardizeCityName", StandardizedCityName);

      await context.dispatch("WeatherModule/setUserLocationData");
    },
    async getUserLocation(context) {
      context.commit("toggleIsLoading", true);
      console.log("start :", context.rootGetters.getIsLoading);
      let userCoords = [];
      await new Promise(function (resolve, reject) {
        if (!navigator.geolocation) return;
        return navigator.geolocation.getCurrentPosition(resolve, reject);
      }).then((response) => {
        // console.log(response);
        const { latitude: lat, longitude: lng } = response.coords;
        userCoords = [lat, lng];
        // return userCoords;
      });
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${userCoords[0]}&lon=${userCoords[1]}&format=json&apiKey=ab3165b7c7254d23a5d3f5a30c4df722`
      )
        .then((response) => response.json())
        .then((res) => {
          const cityName = res.results[0].city;
          context.commit("setUserCity", cityName);
          return cityName;
          // set
        })
        .then((cityName) => {
          context.dispatch("locationCityStandardize", cityName);
        });
    },
    async ManualsetLocation(context, payload) {
      await context.dispatch("locationCityStandardize", payload);
      context.commit("setUserCity", payload);
    },
    changeColorMode(context) {
      context.commit("changeColorMode");
    },
  },
  mutations: {
    changeShowMap(state, payload) {
      state.showMap = payload;
    },
    setFutureDay(state, payload) {
      // console.log("root FutureDay :", payload);
      state.FutureDay = payload;
    },
    setStandardizeCityName(state, payload) {
      // console.log(payload);
      state.UserCityStandardize = payload;
    },
    toggleIsLoading(state, payload) {
      state.isLoading = !!payload;
    },
    setToday(state, payload) {
      state.Today.month = payload.Month;
      state.Today.date = payload.TodayDate;
      state.Today.day = payload.TodayDay;
      state.Today.hours = payload.Hours;
      if (payload.Hours <= 5 || payload.Hours >= 18) {
        state.Today.isNight = true;
      } else {
        state.Today.isNight = false;
      }
    },
    changeColorMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setUserCity(state, payload) {
      state.UserCity = payload;
      // console.log(state.UserCity);
    },
  },

  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
    getShowMap(state) {
      return state.showMap;
    },
    getColorMode(state) {
      return state.isDarkMode;
    },
    getToday(state) {
      return state.Today;
    },
    getUserCityStandardize(state) {
      return state.UserCityStandardize;
    },
    getUserCity(state) {
      return state.UserCity;
    },
    getFutureDay(state) {
      return state.FutureDay;
    },
  },
});
