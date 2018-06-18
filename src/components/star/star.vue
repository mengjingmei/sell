<template>
  <!--评分星星组件-->
  <div class="star" :class="starType">
    <span class="star-item" :class="itemClass" v-for="itemClass in itemClasses" :key="itemClass.index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  // 定义一些常量
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  const LEN = 5;
  // 初始化组件
  export default {
    props: {
      // 星星的尺寸
      size: {
        type: Number
      },
      // 评分
      score: {
        type: Number
      }
    },
    computed: {
      // 根据星星尺寸返回星星类
      starType() {
        return 'star-' + this.size;
      },
      // 根据评分返回星星数组
      itemClasses() {
        let result = [];
        // 获取全星，半星和空白星星个数
        let numOn = Math.floor(this.score);
        let numHalf = ((this.score - numOn) > 0.5) ? 1 : 0;
        let numOff = LEN - numOn - numHalf;
        // 根据全星。半星，空白星星个数，将对应的字符串加入到数组中
        for (let i = 0; i < numOn; i++) {
          result.push(CLS_ON);
        }
        if (numHalf > 0) {
          result.push(CLS_HALF);
        }
        for (let i = 0; i < numOff; i++) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')

</style>
