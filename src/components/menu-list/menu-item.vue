<template>
<div class="mitem" @click="item.func">
  <span class="mitem__text">{{item.text}}</span>
</div>
</template>

<script>

export default {
  name: "menu-item",
  components: {},
  props: ['item'],
  data() {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {}
}
</script>

<style lang="scss">
.mitem {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 118px;
  height: 31px;
  padding: 5px 10px;
  margin-bottom: 6px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
  &__text {
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
  }
}
</style>