import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from "@/pages/mainPage/mainPage";
import options from "@/pages/options/options";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: mainPage
  },
  {
    path: '/options',
    name: 'options',
    component: options
  }
]

const router = new VueRouter({
  routes
})

export default router