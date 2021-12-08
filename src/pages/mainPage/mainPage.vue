<template>
  <div class="main">

<!--    <dropdownList class="main__drop" v-if="ratesList[0]"-->
    <dropdownList class="main__drop" v-if="ratesList[0]"
                  :data="{loading: loadingState,
                  list: symbolsList,
                  chosenItem: chosenRate.alt,
                  width: '45vw', margin: '2vw 0 5vw',
                  image: 'flags', headerText: 'Press to choose rate',
                  chooseFunc: chooseRate}"/>

    <loading :loadingOps="{type: 'download', pos: loadingPos}" v-if="loadingState"/>

    <!-- Rate Card -->
    <rateCard v-show="isCardShow"></rateCard>
  </div>
</template>

<script>
import electron from 'electron';

import dropdownList from "@/components/dropdown-list";
import loading from "@/components/loading";
import rateCard from "@/pages/mainPage/components/rateCard";

export default {
  name: "mainPage",
  components: {dropdownList, loading, rateCard},
  data: function () {
    return {

      flags: {},
      rates: [],
      symbols: [],

      data: this.accessData,
    }
  },
  methods: {
    /**
     * Устанавливает значение для карточки валюты
     * @param {object} item
     * @param {string} item.key - короткая аббревиатура валюты
     * @param {string} item.text - расшифровка аббревиатуры
     * @param {string} item.flag - название флага для выбора изображения флага
     * @param {string} rate.amount - цифровое соотношение выбранной валюты к валюте клиента
     */
    chooseRate(item) {
      this.ratesList.forEach((rate) => {
        if (rate.name === item.key) {
          this.$store.dispatch('chooseCard', {
                amount: rate.amount,
                name: item.key,
                alt: item.text,
                flag: item.flag
              }
          )
        }
      })
    }
  },
  computed: {
    loadingPos() {
      if (!this.$store.getters.getListReady) {
        return 'pre'
      } else {
        return 'after'
      }
    },
    loadingState() {
      return this.$store.getters.getIsOnLoading;
    },
    ratesList() {
      return this.$store.getters.getRatesList;
    },
    symbolsList() {
      return this.$store.getters.getSymbolsList;
    },
    isCardShow() {
      return this.$store.getters.getIsCardShowState;
    },
    chosenRate() {
      return this.$store.getters.getChosenRate;
    }
  },
  watch: {},
  mounted: async function () {
    let accessData;
    let htmlElement = document.documentElement;

    // Установка темы
    if (localStorage.getItem('theme')) {
      let theme = localStorage.getItem('theme');
      htmlElement.setAttribute('theme', theme);
      this.$store.commit('setTheme', theme[0].toUpperCase() + theme.slice(1));
    } else {
      htmlElement.setAttribute('theme', 'white');
      this.$store.commit('setTheme', 'white');
    }

    // Получение сохраненных данных для парса валют
    if (localStorage.getItem('accessData')) {
      accessData = JSON.parse(localStorage.getItem('accessData'))
      this.$store.commit('setAccessData', accessData);
    } else {
      let token = this.$store.getters.getDefaultToken;
      let linkToRates = this.$store.getters.getDefaultRates;
      let linkToAbb = this.$store.getters.getDefaultAbb;
      accessData = {token: token, linkToRates: linkToRates, linkToAbb: linkToAbb};
    }

    // Формирование нового списка валют
    if (!this.$store.getters.getListReady && !this.$store.getters.getIsOnLoading) {
      await this.$store.dispatch('startLoad');
      this.flags = await electron.ipcRenderer.invoke('get-events', {action: 'getFlags'})

      await electron.ipcRenderer.send('get-events', {action: 'getRates', accessData: accessData});
      await electron.ipcRenderer.send('get-events', {
        action: 'getSymbols',
        accessData: accessData,
        flags: this.flags
      });
    }

    // Получение сохранённого списка валют
    if (localStorage.getItem('completeRatesList') && localStorage.getItem('completeSymbolsList')) {
      this.rates = JSON.parse(localStorage.getItem('completeRatesList'));
      this.symbols = JSON.parse(localStorage.getItem('completeSymbolsList'));
      this.$store.commit('setListReady', true);

      await this.$store.dispatch('setLists', {rates: this.rates, symbols: this.symbols});
    }

    electron.ipcRenderer.on('get-events', (event, arg) => {
      if (!arg.error) {
        switch (arg.action) {
          case 'getRates':
            this.rates = arg.rates;
            this.$store.commit('setRatesList', this.rates);

            localStorage.setItem('completeRatesList', JSON.stringify(this.rates));
            break
          case 'getSymbols':
            this.symbols = arg.symbols;
            this.$store.commit('setListReady', true);
            this.$store.commit('setSymbolsList', this.symbols);
            this.$store.dispatch('endLoad');

            localStorage.setItem('completeSymbolsList', JSON.stringify(this.symbols));
            break
        }
      } else {
        electron.ipcRenderer.send('service-events', {
          action: 'show-notif',
          notifData: {type: 'fail', message: arg.error.message}
        });
        this.$store.dispatch('endLoad');
      }
    })
  }
}
</script>

<style lang="scss">
.main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: column;
  height: 95vh;
}
</style>