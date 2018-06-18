<template>
  <!--图标小组件-->
  <span class="icon" :class="[sizeClass, classMap[iconType]]"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      iconType: {
        type: Number
      },
      iconSize: {
        type: Number
      }
    },
    created() {
      let arr = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.classMap = [];
      for (let i = 0; i < 5; i++) {
        this.classMap.push(arr[i] + '-' + this.iconSize);
      }
      this.sizeClass = 'sizeClass' + this.iconSize;
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .icon
    display: inline-block
    &.sizeClass1
      icon-Size(1)
    &.sizeClass2
      icon-Size(2)
    &.sizeClass3
      icon-Size(3)
    &.sizeClass4
      icon-Size(4)
    &.decrease-1
      bg-image("decrease_1")
    &.decrease-2
      bg-image("decrease_2")
    &.decrease-3
      bg-image("decrease_3")
    &.decrease-4
      bg-image("decrease_4")
    &.discount-1
      bg-image("discount_1")
    &.discount-2
      bg-image("discount_2")
    &.discount-3
      bg-image("discount_3")
    &.discount-4
      bg-image("discount_4")
    &.guarantee-1
      bg-image("guarantee_1")
    &.guarantee-2
      bg-image("guarantee_2")
    &.guarantee-3
      bg-image("guarantee_3")
    &.guarantee-4
      bg-image("guarantee_4")
    &.invoice-1
      bg-image("invoice_1")
    &.invoice-2
      bg-image("invoice_2")
    &.invoice-3
      bg-image("invoice_3")
    &.invoice-4
      bg-image("invoice_4")
    &.special-1
      bg-image("special_1")
    &.special-2
      bg-image("special_2")
    &.special-3
      bg-image("special_3")
    &.special-4
      bg-image("special_4")
</style>
