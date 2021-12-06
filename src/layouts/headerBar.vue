<template>
  <section class="headerBar">
    <div type="button" class="iconBtn" @mouseover="switchMenu(true)" @mouseleave="switchMenu(false)">
      <img src="../assets/svg/controls/options.svg" alt="=" class="headerBar__icon icon32">
      <menuList v-show="showMenu" class="headerBar__menu" :list="menu"/>
    </div>

    <span class="headerBar__name">
    ATM
  </span>
    <div class="headerBar__controls">
      <button type="button" class="iconBtn" @click="hideWin">
        <img class="headerBar__icon" src="../assets/svg/controls/hide.svg" alt="-">
      </button>
      <button type="button" class="iconBtn" @click="closeWin">
        <img class="headerBar__icon" src="../assets/svg/controls/close.svg" alt="x">
      </button>
    </div>
  </section>
</template>

<script>
import electron from "electron";
import options from "@/pages/options/options.vue";
import menuList from "@/components/menu-list/menu-list";

export default {
  name: "headerBar",
  components: {options, menuList},
  data: function () {
    return {
      navBtn: 'Settings',
      menu: [
        {
          text: 'Settings',
          func: this.switchOps
        },
        {
          text: 'Exit',
          func: this.closeWin
        }
        ]
    }
  },
  methods: {
    switchMenu(boolean) {
      this.$store.commit('setMenuShow', boolean)
    },
    switchOps() {
      this.$store.commit('setMenuShow', false)
      switch (this.$route.name) {
        case 'options':
          this.$router.push({name: 'mainPage'});
          break
        case 'mainPage':
          this.$router.push({name: 'options'});
          break
      }
    },
    hideWin() {
      electron.ipcRenderer.send('service-events', {action: 'hide-win'});
    },
    closeWin() {
      this.$store.commit('setMenuShow', false)
      electron.ipcRenderer.send('service-events', {action: 'close-win'});
    },
  },
  computed: {
    showMenu() {
      return this.$store.getters.getIsMenuShow;
    },
    menuNavBtn() {
      switch (this.$route.name) {
        case 'options':
          return 'Home';
        case 'mainPage':
          return 'Settings'
        default:
          return 'Settings';
      }
    }
  },
  watch: {
    menuNavBtn() {
      // this.navBtn = this.menuNavBtn;
    }
  },
  mounted() {
    // console.log(this.menuNavBtn);
  },
}
</script>

<style lang="scss">
.headerBar {
  position: relative;
  -webkit-app-region: drag;
  z-index: 9999;
  display: flex;
  flex-flow: row;

  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  height: 32px;
  width: 100%;

  &__menu {
    top: 32px;
    left: 0;
  }

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