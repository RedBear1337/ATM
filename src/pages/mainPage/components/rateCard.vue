<template>
<section class="card">

  <!-- Info -->
  <div class="card__info">
    <h1 class="card__title">
    Rate:
    <span class="card__subtitle">{{rate.name}}</span>
  </h1>
    <span class="card__title">
    Amount:
    <span class="card__subtitle">{{rate.amount}}</span>
  </span>
  </div>

  <!-- Flag's Img -->
  <img :src="require('../../../assets/svg/flags/'+rate.flag+'.svg')" alt="" class="card__flag">
<!--  <img :src="require('../../../assets/svg/flags/'+'ae'+'.svg')" alt="" class="card__flag">-->
</section>
</template>

<script>
export default {
  name: "rateCard",
  components: {},
  props: [],
  data: function () {
    return {
    }
  },
  methods: {},
  computed: {
    rate() {
      return this.$store.getters.getChosenRate;
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss">
.card {
  -webkit-user-select: none;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex-flow: row;

  min-width: 45vw;
  padding: 20px;

  border-radius: 20px;
  box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.15);

  //============  Text info block
  &__info {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-flow: column;
    margin-right: 2vw;
    //color: white;
  }

  &__title {
    font-size: 2.4vw;
  }
  &__subtitle {
    font-size: 2vw;
  }

  //============  Img
  &__flag {
    width: 20vw;
    height: 14vw;
    pointer-events: none;
  }
}

</style>