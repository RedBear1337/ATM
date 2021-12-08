<template>
  <b-modal centered no-close-on-esc no-close-on-backdrop hide-footer hide-header hide-header-close id="notif">
  <div :class="'mess'+'__'+notifType">
    <div class="mess__header">
      <svg class="mess__icon" v-if="notifType === 'succ'" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3332 33.1251L9.58317 24.3751L6.6665 27.2917L18.3332 38.9584L43.3332 13.9584L40.4165 11.0417L18.3332 33.1251Z" fill="#212529"/>
      </svg>

      <svg class="mess__icon" v-else-if="notifType === 'fail'" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.7708 6.25H17.2292L6.25 17.2292V32.7708L17.2292 43.75H32.7708L43.75 32.7708V17.2292L32.7708 6.25ZM39.5833 31.0417L31.0417 39.5833H18.9583L10.4167 31.0417V18.9583L18.9583 10.4167H31.0417L39.5833 18.9583V31.0417ZM30.8958 16.1667L25 22.0625L19.1042 16.1667L16.1667 19.1042L22.0625 25L16.1667 30.8958L19.1042 33.8333L25 27.9375L30.8958 33.8333L33.8333 30.8958L27.9375 25L33.8333 19.1042L30.8958 16.1667Z" fill="#212529"/>
      </svg>

      <svg class="mess__icon" v-else width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.9998 12.5L24.9998 4.16666L35.4165 14.5833L24.9998 25L24.9998 16.6667C18.104 16.6667 12.4998 22.2708 12.4998 29.1667C12.4998 36.0625 18.104 41.6667 24.9998 41.6667C31.8957 41.6667 37.4998 36.0625 37.4998 29.1667L41.6665 29.1667C41.6665 38.375 34.2082 45.8333 24.9998 45.8333C15.7915 45.8333 8.33317 38.375 8.33317 29.1667C8.33317 19.9583 15.7915 12.5 24.9998 12.5Z" fill="black"/>
      </svg>

      <span class="mess__title">{{ title }}</span>
    </div>
    <div class="mess__log" v-if="notifType === 'fail'">
      <span class="mess__message">{{ message }}</span>
    </div>
    <button class="mess__btn" v-if="notifType !== 'process'" @click="$bvModal.hide('notif')">Ok</button>
  </div>
  </b-modal>
</template>

<script>
import electron from "electron";

export default {
  name: "notifModal",
  components: {},
  props: ['text'],
  data: function () {
    return {
      // mode => succ || fail || process
      notifType: 'succ',
      message: ''
    }
  },
  methods: {},
  computed: {
    title() {
      if (this.notifType === 'fail') {
        return 'Failure'
      } else if (this.notifType === 'succ') {
        return 'Success'
      } else {
        return 'In process'
      }
    }
  },
  watch: {
  },
  mounted() {
    electron.ipcRenderer.on('service-events', (event, arg)=>{
      switch (arg.action) {
        case 'show-notif':
          this.notifType = arg.notifData.type;
          this.message = arg.notifData.message;
          this.$bvModal.show('notif');
          break
        case 'hide-notif':
          this.$bvModal.hide('notif');
          break
      }
    });
  },
}
</script>

<style lang="scss">
.mess {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360px;
  min-height: 140px;
  //padding: 0 16px 16px;
  //padding: 12px 16px 16px !important;

  &__fail {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
  &__succ {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
  &__process {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;

    & > div {
      padding: 0 16px;
    }
  }

  &__header {
    position: relative;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 50px;
    padding: 12px 16px 0;
  }

  &__icon {
    width: 50px;
    height: 50px;
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
  &__log {
    margin-top: 16px;
    padding: 0 60px;
    width: 100%;
  }
  &__message {
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 120%;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 53px;
    margin: 16px 0;

    box-shadow: 0px 2px 10px -2px rgba(0, 0, 0, 0.25);

    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 32px;
  }
}

// Bootstrap

.modal-body {
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: transparent !important;
}
.modal-content {
  border: none !important;
}
.modal-backdrop {
  opacity: .3 !important;
}
</style>