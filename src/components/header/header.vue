<template>
  <!--头部组件-->
  <div class="header">
    <!--商家信息页面-->
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
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <!--根据不同优惠活动显示不同图标和优惠信息-->
          <icon :iconSize="1" :iconType="seller.supports[0].type"></icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <!--公告栏-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--模糊背景-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <!--商家详情浮动页面-->
    <transition name="fade">
      <div v-show="detailShow" class="detail" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="supports">
              <div class="title">
                <div class="line"></div>
                <div class="name">商家信息</div>
                <div class="line"></div>
              </div>
              <div class="content">
                <ul v-if="seller.supports">
                  <li class="supports-item" v-for="item in seller.supports" :key="item.index">
                    <icon :iconSize="2" :iconType="item.type"></icon>
                    <span class="text">{{item.description}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bulletin">
              <div class="title">
                <div class="line"></div>
                <div class="name">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="content">
                <p>{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
        </div>
        <!--浮层关闭按钮-->
        <div class="detail-close">
          <i @click="closeDetail" class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import icon from '../../components/icon/icon.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      closeDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    // 注册组件
    components: {
      // 也可以直接写star
      'star': star,
      'icon': icon
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    overflow: hidden
    position: relative
    color: #fff
    .content-wrapper
      position: relative
      box-sizing: border-box
      background-color: rgba(7, 17, 27, 0.6)
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
          background-color: rgba(0, 0, 0, 0.2)
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
      background-color: rgba(7, 17, 27, 0.8)
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
      filter: blur(20px)
    .detail
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 100
      overflow: auto
      fiter: blur(10px)
      background: rgba(7, 17, 27, 0.8)
      &.fade-enter-active,&.fade-leave-active{
        transition: 0.5s
      }
      &.fade-enter
        opacity:0
        background:rgba(7,17,27,0)
      &.fade-leave
        opacity:1
        background:rgba(7,17,27,0.8)
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          font-size: 14px
          margin-top: 64px
          padding-bottom: 64px
          .name
            width: 100%
            height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
            line-height: 16px
            color: rgb(255, 255, 255)
          .star-wrapper
            width: 100%
            text-align: center
            margin: 16px auto 28px auto;
          .supports
            width: 100%
            margin: 24px 0 28px 0
            .title
              width: 90%
              display: flex
              margin: 0 auto
              .name
                flex: 2
                margin: 0 12px
                font-size: 14px
                font-weight: 700
              .line
                flex: 3
                margin-top: 7px
                border-top: 2px rgba(255, 255, 255, 0.4) solid
            .content
              width: 90%
              margin: 24px auto
              .supports-item
                width: 100%
                margin-left: 12px
                margin-bottom: 12px
                .text
                  vertical-align: top
                  text-align: left
                  font-size: 12px
                  font-weight: 200
                  line-height: 12px
          .bulletin
            width: 100%
            margin: 24px 0 28px 0
            .title
              width: 90%
              display: flex
              margin: 0 auto
              .name
                flex: 2
                margin: 0 12px
                font-size: 14px
                font-weight: 700
              .line
                flex: 3
                margin-top: 7px
                border-top: 2px rgba(255, 255, 255, 0.4) solid
            .content
              width: 90%
              margin: 24px auto
              p
                padding: 0 12px
                font-size: 12px
                line-height: 24px

      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
      .icon-close
        color: rgba(255, 255, 255, 0.5)
</style>
