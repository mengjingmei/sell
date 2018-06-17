<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64px" height="64px" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div class="supports" v-if="seller.supports">
          <!--根据不同优惠活动显示不同图标和优惠信息-->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--模糊背景-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    color: #fff
    .content-wrapper
      position: relative
      box-sizing: border-box
      background-color: rgba(7,17,27,0.6)
      padding: 24px 12px 18px 24px
      //商家图标
      .avatar
        display: inline-block
        img
          border-radius: 2px
      //商家信息
      .content
        display: inline-block
        font-size: 0px
        box-sizing: border-box
        margin: 2px 0px 2px 16px
        .title
          //品牌图标
          .brand
            display: inline-block
            width: 30px
            height: 18px
            margin-right: 6px
            bg-image(brand)
            background-size: 30px 18px
          //商家名称
          .name
            vertical-align: top
            display: inline-block
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          margin-top: 8px
          margin-bottom: 10px
          font-size: 12px
          font-weight: 200
          line-height: 12px
        .supports
          .icon
            display: inline-block
            width: 12px
            height: 12px
            background-size: 12px 12px
            margin-right: 4px
            &.decrease
              bg-image("decrease_1")
            &.discount
              bg-image("discount_1")
            &.guarantee
              bg-image("guarantee_1")
            &.invoice
              bg-image("invoice_1")
            &.special
              bg-image("special_1")
          .text
            vertical-align: top
            text-align: left
            font-size: 10px
            font-weight: 200
            line-height: 12px
        .support-count
          position: absolute
          right: 12px
          bottom: 18px
          height: 24px
          box-sizing: border-box
          text-align: center
          line-height: 24px
          border-radius: 14px
          background-color: rgba(0,0,0,0.2)
          .count
            font-size: 14px
            margin: 7px 2px 7px 8px
            line-height: 24px
          .icon-keyboard_arrow_right
            font-size: 14px
            line-height: 24px
            margin: 7px 8px 7px 0px
    .bulletin-wrapper
      position: relative
      box-sizing: border-box
      width: 100%
      height: 28px
      background-color: rgba(7,17,27,0.8)
      padding-right: 22px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-title
        display: inline-block
        vertical-align: top
        width: 22px
        height: 12px
        vertical-align: top
        bg-image("bulletin")
        background-size: 22px 12px
        margin: 7px 0px 7px 12px
      .bulletin-text
        vertical-align: top
        line-height: 28px
        font-size: 10px
        margin: 0px 12px 0px 4px
      .icon-keyboard_arrow_right
        position: absolute
        right: 10px
        top: 0px
        font-size: 14px
        line-height: 28px
    .background
      position: absolute
      left: 0px
      top: 0px
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
</style>
