<template>
  <div id="app">

    <!-- Window Header -->
    <headerBar></headerBar>

    <!-- Main Content -->
    <router-view/>
    <notifModal/>
  </div>
</template>

<script>
import headerBar from "@/layouts/headerBar";
import notifModal from "@/components/notifModal";

export default {
  name: "app",
  components: {headerBar, notifModal},
  data: function () {
    return {}
  },
  computed: {},
  watch: {},
  mounted: async function () {

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
