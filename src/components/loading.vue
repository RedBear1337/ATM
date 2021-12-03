<template>
  <div class="loading">
      <span class="loading__title" v-if="genText">
        Please wait, {{genText}}
      </span>
    <span class="loading__title" v-else>
      Loading...
    </span>
    <b-progress class="loading__bar" :value="value" :max="max" show-progress animated style="width: 100%;">
      <b-progressBar :value="value" variant="danger" style="color: white; "/>
    </b-progress>
  </div>
</template>

<script>
import electron from 'electron';
export default {
  name: "loading",
  components: {},
  props: ['state'],
  data() {
    return {
      // Progress Bar
    }
  },
  methods: {},
  computed: {
    value() {
      return this.$store.getters.getValue;
    },
    max() {
      return this.$store.getters.getMax;
    },
    /**
     * Возвращает сгенерированную строку, на основе ключегово слова (download)
     * @return {string}
     */
    genText() {
      switch (this.state) {
        case ('download'):
          return 'list is downloading'
      }
    }
  },
  watch: {},
  mounted: async function () {
    if (this.$store.getters.getValue === 0) {
            await electron.ipcRenderer.send('get-events', {action: 'get-progressBar-update'})
    }

electron.ipcRenderer.on('get-events', (event, arg)=>{
  if (arg.action === 'get-progressBar-update') {
    this.$store.commit('setValue', arg.value);
    if (arg.max) {
      this.$store.commit('setMax', arg.max);
    }
  }
})
  },
}
</script>

<style lang="scss">
.loading {
  margin-top: 20px;
  &__title {

  }
}

</style>