import Vue from 'vue'
import router from "@/router";
import store from '@/store'
import options from "@/components/modals/options.vue";
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(options)
}).$mount('#app')