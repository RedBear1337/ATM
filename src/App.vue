<template>
  <div id="app">

    <!-- Window Header -->
    <headerBar></headerBar>

    <!-- Main Content -->
    <router-view/>
  </div>
</template>

<script>
import headerBar from "@/layouts/headerBar";
import electron from "electron";
export default {
  name: "app",
  components: {headerBar},
  data: function () {
    return {}
  },
  computed: {},
  watch: {},
  mounted: async function () {
    // let accessData = JSON.parse(localStorage.getItem('accessData'))
    // await electron.ipcRenderer.send('get-events', {action: 'getList', accessData: accessData})
  },
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
@import "assets/scss/app";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
