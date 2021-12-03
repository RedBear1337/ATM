<template>
  <div class="main">

    <dropdownList class="main__drop" v-if="ratesList[0]"
                  :data="{loading: loading, list: symbolsList, width: '45vw', margin: '2vw 0 5vw', image: 'flags', headerText: 'Press to choose rate', chooseFunc: chooseRate}"/>

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
  },
  watch: {},
  mounted: async function () {
    let accessData;
    let htmlElement = document.documentElement;

    // Получение сохраненных данных для парса валют
    if (localStorage.getItem('accessData')) {
      accessData = JSON.parse(localStorage.getItem('accessData'))
    } else {
      let token = this.$store.getters.getToken;
      let linkToRates = this.$store.getters.getLinkToRates;
      let linkToAbb = this.$store.getters.getLinkToAbb;
      accessData = {token: token, linkToRates: linkToRates, linkToAbb: linkToAbb};
    }

    // Установка темы
    if (localStorage.getItem('theme')) {
      let theme = localStorage.getItem('theme');
      htmlElement.setAttribute('theme', theme);
    }
    else {
      htmlElement.setAttribute('theme', 'white');
    }

    if (!this.$store.getters.getListReady && this.$store.getters.getValue === 0) {
        await electron.ipcRenderer.send('get-events', {action: 'getList', accessData: accessData});
    }
    electron.ipcRenderer.on('get-events', (event, arg) => {
      switch (arg.action) {
        case ('getList'):
          if (arg.list) {
            this.rates = arg.list.rates;
            this.symbols = arg.list.symbols;
          } else {
            this.rates = arg.rates;
            this.symbols = arg.symbols;
          }

          this.$store.commit('setListReady', true);
          this.$store.commit('setLists', {ratesList: this.rates, symbolsList: this.symbols});
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