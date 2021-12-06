<template>
  <div class="drop" :style="`width: ${data.width}; margin: ${data.margin}`">
    <v-select v-model="item" :options="data.list" label="text" :clearable="isCardShow">

      <!-- Dropdown Header -->
      <template #header v-if="data.headerText">
        <div class="drop__header">{{ data.headerText }}</div>
      </template>

      <!-- Dropdown -->
      <template class="drop__select" v-if="data.loading === false" v-slot:option="option" @click="data.chooseFunc(option.text)">
        <img class="drop__img" v-if="data.image === 'flags'"
             :src="require('../assets/svg/flags/'+option.flag+'.svg')"
             alt="">
        <img class="drop__img" v-if="data.image === 'themes'"
             :src="require('../assets/svg/themes/'+option.text.toLowerCase()+'.svg')"
             alt="">
        {{ option.text }}
      </template>

      <!-- Loading spinner -->
      <template #spinner="{ loading }">
        <div v-if="data.loading === true" class="drop__loading vs__spinner"/>
      </template>
    </v-select>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  name: "dropdown-list",
  components: {vSelect},
  props: ['data'],
  data() {
    return {
      item: '',
    }
  },
  methods: {},
  computed: {
    isCardShow() {
      return this.$store.getters.getIsCardShowState;
    }
  },
  watch: {
    item(value) {
      this.data.chooseFunc(value);
    },
  },
  mounted() {
    if (!(!!this.data.margin)) {
      this.data.margin = 0;
    }
    if (!!this.data.chosenItem) {
      this.item = this.data.chosenItem;
    }
  },
}
</script>

<style lang="scss">
//============  Dropdown
.drop {
  position: relative;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  //width: 45vw;

  padding: 10px 0;

  //============  Dropdown
  &__header {
    margin-bottom: 10px;
  }
  &__select {
    width: 100% !important;
  }
  &__img {
    //width: 30px;
    width: 2.5vw;
    //height: 21px;
    height: 1.75vw;
    object-fit: fill;
    margin-right: 5px;
  }
  &__loading {
    border-left-color: rgba(88, 151, 251, 0.70)
  }
}

//============  Dropdown content-menu
.vs__dropdown-toggle {
  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  //min-width: 20vw; //**** надо либо включить, либо посмотреть как обойти
  width: 100%;
  //padding: 5px 45px; //****
  padding: 5px 5%;

  cursor: pointer;
}

//============  Dropdown content-state
.vs--open, .vs--single, .vs--searchable {
  width: 100% !important;
}

//============  Dropdown selected item
.vs__selected-options {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 84%;
  padding-left: 2px;
}

//============  Dropdown selected item span
.vs__selected {
  text-align: left;
  width: 100%;
}

//============  Dropdown input (controls auto hide of list)
.vs__search {
  //display: none;
  width: 0%;
}

//============  Dropdown content-list
.vs__dropdown-menu {
  position: absolute;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 7px;
  max-height: 20vw;
  overflow-y: auto;

  //============  Dropdown items
  > li {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 5px;

    &:hover {

    }
  }
}

</style>