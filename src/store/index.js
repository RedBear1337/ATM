import Vue from 'vue'
import Vuex from 'vuex'

import rate from "@/store/rate";
import theme from "@/store/theme";
import accessData from "@/store/accessData";
import readyStates from "@/store/readyLists";
import loading from "@/store/loading";
import headerMenu from "@/store/headerMenu";
import notif from "@/store/notif";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rate,
    theme,
    accessData,
    readyStates,
    loading,
    headerMenu,
    notif
  }
})
