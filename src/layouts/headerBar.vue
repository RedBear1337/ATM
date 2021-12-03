<template>
<section class="headerBar">
<!--  switchOps-->
  <button type="button" class="iconBtn" @click="switchOps">
    <img src="../assets/svg/controls/options.svg" alt="=" class="headerBar__icon icon32">
  </button>
  <span class="headerBar__name">
    ATM
  </span>
  <div class="headerBar__controls">
    <button type="button" class="iconBtn" @click="hideWin">
      <img class="headerBar__icon" src="../assets/svg/controls/hide.svg" alt="-" >
    </button>
    <button type="button" class="iconBtn" @click="closeWin">
      <img class="headerBar__icon" src="../assets/svg/controls/close.svg" alt="x" >
    </button>
  </div>
</section>
</template>

<script>
import electron from "electron";
import options from "@/pages/options/options.vue";

export default {
  name: "headerBar",
  components: {options},
  data: function () {
    return {

    }
  },
  methods: {
    switchOps() {
      this.$router.push({name: 'options'});
      // if (this.show) {
      //   electron.ipcRenderer.send('open-window-events', {action: 'show', windowName: 'ops'});
      // } else {
      //   electron.ipcRenderer.send('open-window-events', {action: 'hide', windowName: 'ops'});
      // }
    },
    hideWin() {
      electron.ipcRenderer.send('service-events', {action: 'hide-win'});
    },
    closeWin() {
      electron.ipcRenderer.send('service-events', {action: 'close-win'});
    },
  },
  computed: {},
  watch: {},
  mounted() {

  },
}
</script>

<style lang="scss">
.headerBar {
  -webkit-app-region: drag;
  z-index: 9999;
  display: flex;
  flex-flow: row;
  
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  height: 32px;
  width: 100%;

  &__name {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-style: normal;
    font-weight: 500;
    font-size: 2vw;
    //line-height: 28px;
    line-height: 1.5;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //width: 58px;
    .iconBtn {
      margin-left: 27px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  &__icon {
    width: 26px;
    height: 26px;
  }

}

.icon32 {
  width: 32px;
  height: 32px;
}
.iconBtn {
  -webkit-app-region: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}


</style>