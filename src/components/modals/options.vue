<template>
  <div class="ops" style="position: absolute; top: 50%">
    <div class="ops__header">
      <span class="ops__title">Options</span>
      <button class="ops__close">
<!--        <img class="ops__icon" src="../../assets/svg/controls/close.svg" alt="X">-->
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 6.61143L19.3886 5L13 11.3886L6.61143 5L5 6.61143L11.3885 13L5 19.3886L6.61143 21L13 14.6114L19.3886 21L21 19.3886L14.6114 13L21 6.61143Z" fill="#212529"/>
        </svg>
      </button>
    </div>
    <div class="ops__inner">
      <div class="ops__label">
        <span class="ops__subtitle">Themes</span>
        <dropdownList class="ops__drop"
                      :data="{loading: loading, list: themes, image: 'themes', width: '200px', chooseFunc: chooseTheme}"></dropdownList>
      </div>
      <label class="ops__label">
        <span class="ops__subtitle">Import Data</span>
        <input placeholder="Your Token" type="text" class="ops__input">
        <input placeholder="Link to rates" type="text" class="ops__input">
        <input placeholder="Link to abbreviations" type="text" class="ops__input">
        <button :disabled="true" class="ops__btn">Import</button>
      </label>
    </div>

    <div class="ops__controls">
      <actionButton :data="{message: 'Apply', width: '220px', type: 'button'}"/>
      <actionButton :data="{message: 'Exit', width: '220px', type: 'button'}"/>
    </div>

    <img src="../../assets/scss/themes/white.scss" alt="" class="ops_Test">
  </div>
</template>

<script>
import dropdownList from "@/components/dropdown-list";
import actionButton from "@/components/action-button";

import {ThemeHelper} from "@/backend/helpers/themeHelper";

export default {
  name: "options",
  components: {dropdownList, actionButton},
  data: function () {
    return {
      themeLinks: {
        white: '../../assets/scss/themes/white.scss',
        black: '../../assets/scss/themes/black.scss',
        autumn: '../../assets/scss/themes/autumn.scss',
        dark: '../../assets/scss/themes/dark.scss',
      },
      themeHelper: new ThemeHelper(),
      loading: true,
    }
  },
  methods: {
    chooseTheme(theme) {
      this.$store.commit('setTheme', theme.text[0].toLowerCase()+theme.text.slice(1));
      console.log(theme.text);
    }
  },
  computed: {
    themes() {
      let arr = [];
      let keys = Object.keys(this.themeLinks);
      let entries = Object.entries(this.themeLinks);

      function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1)
      }

      for (let i = 0; i < keys.length; i++) {
        arr.push({text: capitalize(entries[i][0]), link: entries[i][1]})
        console.log(entries[i])
      }
      return arr;
    },
    chosenTheme() {
      return this.$store.getters.getTheme;
    }
  },
  watch: {
    chosenTheme(value) {
      this.themeHelper.theme = value;
    }
  },
  mounted() {

  },
  created() {
    // add/load themes
    let added = Object.keys(this.themes).map(name => {
      return this.themeHelper.add(name, this.themes[name]);
    });

    Promise.all(added).then(sheets => {
      console.log(`${sheets.length} themes loaded`);
      this.loading = false;
      this.themeHelper.theme = "white";
    });
  }
}
</script>

<style lang="scss">
.ops {
  width: 1021px;
  height: 574px;
  padding: 12px 18px 34px;

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
    padding-left: 16px;
    height: 31px;
    width: 200px;
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
    width: 200px;
    height: 36px;
    box-shadow: 0px 2px 10px -2px rgba(0, 0, 0, 0.25);
  }
}
</style>