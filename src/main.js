import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js";
// import router from "./router";

import BaseButton from "./components/UI/BaseButton.vue";
import BaseSmallIconCard from "./components/UI/BaseSmallIconCard.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import FutureDayCard from "./components/UI/FutureDayCard.vue";
import TestPage from "./components/UI/TestPage.vue";
import LoadingPage from "./components/UI/LoadingPage.vue";
import ChooseLocation from "./components/pages/ChooseLocation.vue";
import SmallChooseLocation from "./components/pages/SmallChooseLocation.vue";
import SmallMap from "./components/pages/SmallMap.vue";

const app = createApp(App);

app.use(store);
// app.use(router);

app.component("base-button", BaseButton);
app.component("base-small-icon-card", BaseSmallIconCard);
app.component("base-card", BaseCard);
app.component("future-day-card", FutureDayCard);
app.component("test-page", TestPage);
app.component("loading-page", LoadingPage);
app.component("choose-location", ChooseLocation);
app.component("small-choose-location", SmallChooseLocation);
app.component("small-map", SmallMap);

app.mount("#app");
