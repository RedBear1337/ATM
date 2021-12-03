<template>
  <button :type="data.type" :style="`width: ${data.width}`" class="activeBtn">
    {{data.message}}
  </button>
</template>

<script>
export default {
  name: "action-button",
  components: {},
  props: ['data'],
  data: function () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {

  },
}
</script>

<style lang="scss">
.activeBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 53px;
  box-shadow: 0px 2px 10px -2px rgba(0, 0, 0, 0.25);

  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 32px;
}
</style>