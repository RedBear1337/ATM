import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from "@/pages/mainPage/mainPage";
import settings from "@/pages/settings/settings";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: mainPage
  },
  {
    path: '/settings',
    name: 'settings',
    component: settings
  }
]

const router = new VueRouter({
  routes
})

export default router