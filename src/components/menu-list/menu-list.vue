<template>
<div class="mlist">
  <menuItem :item="item" :key="item.id" v-for="item in list" />
</div>
</template>

<script>
import menuItem from "@/components/menu-list/menu-item";

export default {
  name: "menu-list",
  components: {menuItem},
  props: ['list'],
  data() {
    return {}
  },
  methods: {
  },
  computed: {},
  watch: {},
  mounted() {}
}
</script>

<style lang="scss">
.mlist {
  position: absolute;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  padding: 6px;
}
</style>