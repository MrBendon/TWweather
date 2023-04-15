export default {
  namespaced: true,
  state() {
    return {
      Forecast72hrData: {},
      UserLocationData: {
        T: String,
        Wx: String,
        WxNum: String,
        AT: String,
        WS: String,
        RR: String,
      },
      FutureData: {},
    };
  },
  actions: {
    async fetchData(context) {
      const fetchfromCWB = await fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=rdec-key-123-45678-011121314`
      );
      const FullResponse = await fetchfromCWB.json();
      const AllLocationsData = await FullResponse.records.locations[0].location;
      //   console.log(AllLocationsData);
      await context.commit("input72hrdata", AllLocationsData);
      //   context.dispatch("setUserLocationData", AllLocationsData);
      //要 fetch 的資料：
      //  局屬氣象站-現在天氣觀測報告  https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0003-001?Authorization=rdec-key-123-45678-011121314&format=JSON （這個不用了，測站不一至）

      //  一般天氣預報-一週縣市天氣預報   https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-005?Authorization=rdec-key-123-45678-011121314&format=JSON

      // *******    後來資料改用  臺灣各縣市鄉鎮未來3天(72小時)逐3小時天氣預報  https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=rdec-key-123-45678-011121314     *******
    },
    async setUserLocationData(context) {
      const UserLoactionStandardizeName = await context.rootState.UserCityStandardize;

      // console.log(context.getters.getForecast72hrData);
      if (context.getters.getForecast72hrData.length === 0) {
        console.log("fetch...");
        // await context.dispatch("fetchData");
      }

      ///////////////////////////////

      // console.log(UserLoactionStandardizeName); // Taichung
      // console.log(context.getters.getForecast72hrData);
      const UserLoactionData = await context.state.Forecast72hrData.find(
        (el) => el.locationName === UserLoactionStandardizeName
      );
      //   console.log(UserLoactionData);
      const filterData = function (String) {
        return UserLoactionData.weatherElement.find((el) => el.description === String).time[0].elementValue[0]
          .value;
      };
      const Temp = filterData("溫度");
      const Wx = filterData("天氣現象");
      const NowAT = filterData("體感溫度");
      const NowWS = filterData("風速");
      const NowPoP6h = filterData("6小時降雨機率");
      const WxNum = UserLoactionData.weatherElement.find((el) => el.description === "天氣現象").time[0]
        .elementValue[1].value;
      const dataTemplate = {
        T: Temp,
        Wx: Wx,
        WxNum: WxNum,
        AT: NowAT,
        WS: NowWS,
        RR: NowPoP6h,
      };
      //   console.log(Wx, "體感溫度：", NowAT, "   風速：", NowWS, "    降雨機率：", NowPoP6h);
      //   console.log(dataTemplate);
      context.commit("setUserLocationData", dataTemplate);
      //   const FutureDateObj = context.rootState.FutureDay;
      const FutureDateObj = context.rootGetters.getFutureDay;
      //   console.log(FutureDateObj);
      //   function getFutureDayWx(daypass) {
      //     const findTheDay = FutureDateObj[daypass].FullDate;

      //     return { theDayFirtValue, theDayWx, theDayWxNum };
      //   }

      //   const Day2WxData = getFutureDayWx("Day2");
      //   console.log(Day2WxData);
      function filterFutureData(descriptionString, daypass) {
        const findTheDay = FutureDateObj[daypass].FullDate;
        const theDayFullData = UserLoactionData.weatherElement
          .find((el) => el.description === `${descriptionString}`)
          .time.filter((el) => el.dataTime.startsWith(`${findTheDay}`))
          .map((el) => +el.elementValue[0].value);
        const theDayHighestNum = Math.max(...theDayFullData);
        const theDayLowestNum = Math.min(...theDayFullData);

        // find Wx and WxNum
        const theDayFirstValue = UserLoactionData.weatherElement
          .find((el) => el.description === "天氣現象")
          .time.filter((el) => el.startTime.startsWith(`${findTheDay}`))[0];
        // console.log(theDayFirstValue);
        const theDayWx = theDayFirstValue.elementValue[0].value;
        const theDayWxNum = +theDayFirstValue.elementValue[1].value;

        const weatherCategory = [
          {
            categoryName: "clear",
            includesNum: [1, 2, 3],
          },
          {
            categoryName: "cloudy",
            includesNum: [4, 5, 6, 7, 25],
          },
          {
            categoryName: "clearwithrain",
            includesNum: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
          },
          {
            categoryName: "thunderrain",
            includesNum: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
          },
          {
            categoryName: "fog",
            includesNum: [24, 26, 27, 28],
          },
          {
            categoryName: "snow",
            includesNum: [23, 37, 42],
          },
        ];
        const theDayWxEng = weatherCategory.find((el) => el.includesNum.includes(theDayWxNum)).categoryName;
        // console.log(theDayFullData, theDayHighestNum, theDayLowestNum);
        return {
          theDayFullData,
          theDayHighestNum,
          theDayLowestNum,
          theDayFirstValue,
          theDayWx,
          theDayWxEng,
          theDayWxNum,
        };
      }
      const Day2FullData = filterFutureData("溫度", "Day2");
      const Day3FullData = filterFutureData("溫度", "Day3");
      const Day4FullData = filterFutureData("溫度", "Day4");

      const rootFutureDataObj = context.rootGetters.getFutureDay;
      //   console.log(rootFutureDataObj);
      Day2FullData.shortDay = rootFutureDataObj.Day2.shortDay;
      Day3FullData.shortDay = rootFutureDataObj.Day3.shortDay;
      Day4FullData.shortDay = rootFutureDataObj.Day4.shortDay;
      //   console.log("FutureData : ", Day2FullData, Day3FullData, Day4FullData);
      //   console.log(Day2FullData, Day2HighestNum, Day2LowestNum);
      context.commit("setUserLoactionFutureData", { Day2FullData, Day3FullData, Day4FullData });
      context.commit("toggleIsLoading", false, { root: true });
      // console.log(context.rootGetters.getIsLoading);
    },
  },
  mutations: {
    input72hrdata(state, payload) {
      state.Forecast72hrData = payload;
    },
    setUserLocationData(state, payload) {
      const weatherCategory = [
        {
          categoryName: "clear",
          includesNum: [1, 2, 3],
        },
        {
          categoryName: "cloudy",
          includesNum: [4, 5, 6, 7, 25],
        },
        {
          categoryName: "clearwithrain",
          includesNum: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
        },
        {
          categoryName: "thunderrain",
          includesNum: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
        },
        {
          categoryName: "fog",
          includesNum: [24, 26, 27, 28],
        },
        {
          categoryName: "snow",
          includesNum: [23, 37, 42],
        },
      ];
      state.UserLocationData = payload;
      state.UserLocationData.Wx = weatherCategory
        .find((el) => el.includesNum.includes(+payload.WxNum))
        .categoryName.toLowerCase();
    },
    setUserLoactionFutureData(state, payload) {
      state.FutureData = payload;
      //   console.log(state.FutureData);
    },
  },
  getters: {
    getForecast72hrData(state) {
      return state.Forecast72hrData;
    },
    getUserLocationData(state) {
      //   console.log(state.UserLocationData);
      return state.UserLocationData;
    },
    getFutureDayData(state) {
      return state.FutureData;
    },
  },
};
