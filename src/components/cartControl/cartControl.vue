<template>
  <div class="cartControl">
    <div class="cart-decrease icon-remove_circle_outline" v-show="this.food.count>0" @click.stop.prevent="decreaseCart"></div>
    <div class="cart-count" v-show="this.food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>

  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      // 添加该食物个数
      addCart(event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cart-add', event.target);
      },
      // 减少该食物个数
      decreaseCart() {
        if (this.food.count < 0) {
          this.food.count = 0;
        } else {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size: 0
    .cart-decrease
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      display: inline-block
      padding: 6px 6px 6px 6px
    .cart-count
      font-size: 10px
      line-height: 24px
      vertical-align: top
      text-align: center
      color: rgb(147, 153, 159)
      display: inline-block
      padding: 6px 6px 6px 6px
    .cart-add
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      display: inline-block
      padding: 6px
</style>
