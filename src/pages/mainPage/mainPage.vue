<template>
  <div class="main">

    <dropdownList class="main__drop" v-if="ratesList[0]"
                  :data="{loading: loading,
                  list: symbolsList,
                  chosenItem: chosenRate.alt,
                  width: '45vw', margin: '2vw 0 5vw',
                  image: 'flags', headerText: 'Press to choose rate',
                  chooseFunc: chooseRate}"/>

    <loading :state="'download'" v-else/>

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
    loading() {
      return !this.$store.getters.getListReady;
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
  watch: {

  },
  mounted: async function () {
    let accessData;
    let htmlElement = document.documentElement;

    // Установка темы
    if (localStorage.getItem('theme')) {
      let theme = localStorage.getItem('theme');
      htmlElement.setAttribute('theme', theme);
      this.$store.commit('setTheme', theme[0].toUpperCase()+theme.slice(1));
    }
    else {
      htmlElement.setAttribute('theme', 'white');
      this.$store.commit('setTheme', 'white');
    }

    // Получение сохраненных данных для парса валют
    if (localStorage.getItem('accessData')) {
      accessData = JSON.parse(localStorage.getItem('accessData'))
    } else {
      let token = this.$store.getters.getDefaultToken;
      let linkToRates = this.$store.getters.getDefaultRates;
      let linkToAbb = this.$store.getters.getDefaultAbb;
      accessData = {token: token, linkToRates: linkToRates, linkToAbb: linkToAbb};
    }
    if (!this.$store.getters.getListReady && !this.$store.getters.getIsOnLoading) {
      await electron.ipcRenderer.send('get-events', {action: 'getList', accessData: accessData});
      await this.$store.dispatch('startLoad');
    }

    // Получение сохранённых списков rates и symbols
    if (localStorage.getItem('completeRatesList') && localStorage.getItem('completeSymbolsList')) {
      this.rates = JSON.parse(localStorage.getItem('completeRatesList'));
      this.symbols = JSON.parse(localStorage.getItem('completeSymbolsList'));
      this.$store.commit('setListReady', true);
      this.$store.commit('setLists', {ratesList: this.rates, symbolsList: this.symbols});
    }

    electron.ipcRenderer.on('get-events', (event, arg) => {
      switch (arg.action) {
        case ('getList'):
          if (arg.rates && arg.symbols) {
            this.rates = arg.rates;
            this.symbols = arg.symbols;
            this.$store.commit('setListReady', true);
            this.$store.commit('setLists', {ratesList: this.rates, symbolsList: this.symbols});
            this.$store.dispatch('endLoad');
            localStorage.setItem('completeRatesList', JSON.stringify(arg.rates));
            localStorage.setItem('completeSymbolsList', JSON.stringify(arg.symbols));
          }
          break
      }

    })
  }
}
</script>

<style lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}
</style>