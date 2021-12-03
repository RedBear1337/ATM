<template>
  <div :class="'mess'+'__'+mode">
    <div class="mess__header">
      <img class="mess__icon" alt="" :src="'../assets/svg/notifications/'+mode+'.svg'">
      <span class="mess__text">{{ message }}</span>
    </div>
    <button class="mess__btn">Ok</button>
  </div>
</template>

<script>
export default {
  name: "successMessage",
  components: {},
  props: ['mode'],
  data: function () {
    return {
      // mode => succ || fail
    }
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {},
}
</script>

<style lang="scss">
.mess {
  width: 360px;
  height: 140px;
  padding: 0 16px 16px;

  &__header {
    position: relative;
    width: 100%;
    padding: 12px;
  }

  &__icon {
    width: 50px;
    height: 50px;
  }

  &__text {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 53px;
    margin-top: 14px;

    box-shadow: 0px 2px 10px -2px rgba(0, 0, 0, 0.25);
  }
}
</style>