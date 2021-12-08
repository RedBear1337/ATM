<template>
  <div class="loading" :style="loadingStyle">
      <span class="loading__title" v-if="genText">
        Please wait, {{ genText }}
      </span>
    <span class="loading__title" v-else>
      Loading...
    </span>
    <b-progress class="loading__bar" :value="value" :max="max" show-progress animated style="width: 100%;">
      <b-progressBar class="loading__line" :value="value" variant="danger"/>
    </b-progress>
  </div>
</template>

<script>
import electron from 'electron';

export default {
  name: "loading",
  components: {},
  props: ['loadingOps'],
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
     * Возвращает сгенерированную строку, на основе ключевого слова (download)
     * @return {string}
     */
    genText() {
      switch (this.loadingOps.type) {
        case ('download'):
          return 'list is downloading'
      }
    },
    loadingStyle() {
      if (this.loadingOps.pos !== 'after') {
        return ''
      } else {
        return 'position: absolute; bottom: 50px; margin-top: 0'
      }

    }
  },
  watch: {},
  mounted: async function () {
    if (this.$store.getters.getIsOnLoading) {
      await electron.ipcRenderer.send('get-events', {action: 'get-progressBar-update'})
    }

    electron.ipcRenderer.on('get-events', (event, arg) => {
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
    padding: 20px;
  }

  &__bar {
    z-index: 0;
    margin-top: 10px;
    padding: 5px;
  }
  &__line {
    padding: 2px 0;
  }
}

</style>