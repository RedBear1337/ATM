<template>
  <div class="ops">
    <div class="ops__header">
      <span class="ops__title">Settings</span>
      <button class="ops__close" @click="$router.go(-1)">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M21 6.61143L19.3886 5L13 11.3886L6.61143 5L5 6.61143L11.3885 13L5 19.3886L6.61143 21L13 14.6114L19.3886 21L21 19.3886L14.6114 13L21 6.61143Z"
              fill="#212529"/>
        </svg>
      </button>
    </div>
    <div class="ops__inner">
      <div class="ops__label">
        <span class="ops__subtitle">Themes</span>
        <dropdownList class="ops__drop"
                      :data="{loading: false,
                      list: themes,
                      chosenItem: chosenTheme,
                      image: 'themes',
                      width: '100%',
                      chooseFunc: chooseTheme}"/>
      </div>
      <form class="ops__label">
        <span class="ops__subtitle">Import Data</span>
        <input v-model="token" placeholder="Your Token" type="text" class="ops__input">
        <input v-model="linkToRates" placeholder="Link to rates" type="text" class="ops__input">
        <input v-model="linkToAbb" placeholder="Link to abbreviations" type="text" class="ops__input">
        <button ref="btn" type="button" @click.prevent="resetToDefault()" class="ops__btn">Reset to default</button>
      </form>
    </div>

    <div class="ops__controls">
      <span @click="apply()">
        <actionButton :disabled="isApplyDisabled" :data="{message: 'Apply', width: '220px', type: 'button'}"/>
      </span>
      <span @click="$router.go(-1)">
        <actionButton :data="{message: 'Exit', width: '220px', type: 'button'}"/>
      </span>
    </div>

    <img src="../../assets/scss/themes/themes.scss" alt="" class="ops_Test">
  </div>
</template>

<script>
import electron from "electron";

import dropdownList from "@/components/dropdown-list";
import actionButton from "@/components/action-button";

export default {
  name: "settings",
  components: {dropdownList, actionButton},
  data: function () {
    return {
      themes: [{text: 'White'}, {text: 'Black'}, {text: 'Autumn'}, {text: 'Dark'}],

      token: '',
      linkToRates: '',
      linkToAbb: '',

      isApplyDisabled: true,
    }
  },
  methods: {
    /**
     * Установить тему
     * @param {string} theme
     */
    chooseTheme(theme) {
      this.$store.commit('setTheme', theme.text);
    },
    /**
     * Сбросить данные для сбора курсов валют до значений по-умолчанию
     */
    resetToDefault() {
      this.token = this.$store.getters.getDefaultToken;
      this.linkToRates = this.$store.getters.getDefaultRates;
      this.linkToAbb = this.$store.getters.getDefaultAbb;
      this.$store.commit('setAccessData', {token: this.token, rate: this.linkToRates, abb: this.linkToAbb});
      localStorage.setItem('accessData', JSON.stringify({
        token: this.token,
        rate: this.linkToRates,
        abb: this.linkToAbb
      }));
    },
    /**
     * Применяет настройки для запроса данных и создаёт запрос
     */
    async apply() {
      let accessData = {token: this.token, rate: this.linkToRates, abb: this.linkToAbb};
      if (!this.$store.getters.getIsOnLoading) {
        electron.ipcRenderer.send('service-events', {action: 'show-notif', notifData: {type: 'process'}})

        // Проверка доступности ссылок
        let connectionState = await electron.ipcRenderer.invoke('check-events', {
          action: 'checkConnection',
          links: [accessData.rate, accessData.abb],
          token: accessData.token
        });
        electron.ipcRenderer.send('service-events', {action: 'hide-notif', notifData: {type: 'process'}})

        // Начало загрузки данных
        if (connectionState) {
          await this.$store.dispatch('startLoad');
          this.$store.commit('setAccessData', accessData);
          localStorage.setItem('accessData', JSON.stringify(accessData));

          let flags = await electron.ipcRenderer.invoke('get-events', {action: 'getFlags'})
          this.$router.go(-1);
          await electron.ipcRenderer.send('get-events', {action: 'getRates', accessData: accessData});
          await electron.ipcRenderer.send('get-events', {
            action: 'getSymbols',
            accessData: accessData,
            flags: flags
          });
          electron.ipcRenderer.send('service-events', {action: 'show-notif', notifData: {type: 'succ'}})
        }


      } else {
        electron.ipcRenderer.send('service-events', {
          action: 'show-notif',
          notifData: {
            type: 'fail',
            message: new Error('Нельзя запустить загрузку списка, пока не закончится текущая загрузка')
          }
        })
      }
    },
  },
  computed: {
    chosenTheme() {
      return this.$store.getters.getTheme;
    },
    defaultToken() {
      return this.$store.getters.getDefaultToken;
    },
    defaultRates() {
      return this.$store.getters.getDefaultRates;
    },
    defaultAbb() {
      return this.$store.getters.getDefaultAbb;
    },

  },
  watch: {
    chosenTheme(value) {
      let htmlElement = document.documentElement;
      if (!!value) {
        localStorage.setItem('theme', value.toLowerCase());
        htmlElement.setAttribute('theme', value.toLowerCase());
      }
    },
    token(value) {
      this.isApplyDisabled = value === this.defaultToken;
    },
    linkToRates(value) {
      this.isApplyDisabled = value === this.defaultRates;
    },
    linkToAbb(value) {
      this.isApplyDisabled = value === this.defaultAbb;
    },

  },
  mounted: async function () {
    if (this.$store.getters.getToken && this.$store.getters.getLinkToRates && this.$store.getters.getLinkToAbb) {
      this.token = await this.$store.getters.getToken;
      this.linkToRates = await this.$store.getters.getLinkToRates;
      this.linkToAbb = await this.$store.getters.getLinkToAbb;
    } else {
      this.token = await this.$store.getters.getDefaultToken;
      this.linkToRates = await this.$store.getters.getDefaultRates;
      this.linkToAbb = await this.$store.getters.getDefaultAbb;
    }

    this.$store.commit('setAccessData', {token: this.token, rate: this.linkToRates, abb: this.linkToAbb});
    localStorage.setItem('accessData', JSON.stringify({
      token: this.token,
      rate: this.linkToRates,
      abb: this.linkToAbb
    }));
  },
}
</script>

<style lang="scss">
.ops {
  position: absolute;
  top: calc(50% + 32px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1021px;
  height: 574px;
  padding: 12px 18px 34px;
  margin: 0 auto;

  &__header {
    position: relative;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-end;
  }

  &__title {
    position: absolute;
    left: 50%;
    transform: translate(-50%);

    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 41px;
  }

  &__close {
    width: 30px;
    height: 30px;
  }

  &__icon {

  }

  &__inner {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
  }

  &__label {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    margin-bottom: 24px;
    width: 220px;
  }

  &__subtitle {
    text-align: left;
    margin-bottom: 12px;

    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
  }

  &__controls {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 464px;
  }

  //=========== Input
  &__input {
    margin-bottom: 12px;
    padding-left: 6px;
    height: 31px;
    width: 100%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);

    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 36px;
    box-shadow: 0px 2px 10px -2px rgba(0, 0, 0, 0.25);
  }
}
</style>