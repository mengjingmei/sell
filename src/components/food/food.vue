<template>
  <div class="food" v-show="showFlag" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img class="img" :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span><s class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</s>
        </div>
        <div class="cartControl-warpper">
          <v-cartControl :food="food"></v-cartControl>
        </div>
        <transition name="addCartMove">
          <div class="addShopcart" v-show="(!food.count)|| (food.count==0)" @click="addFirst($event)"
               transition="addCartMove">加入购物车
          </div>
        </transition>
      </div>
      <v-split v-show="food.info"></v-split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <span class="text">{{food.info}}</span>
      </div>
      <v-split></v-split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <v-ratingSelect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent"
                        :desc="desc" @selRatings="filterRatings" @isContent="isContent"></v-ratingSelect>
        <div class="ratings-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating,index) in food.ratings" :key="index"
                class="rating-item border-1px">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" width="12" height="12" class="avatar">
              </div>
              <div class="timer">{{rating.rateTime | formatDate('yyyy-MM-dd hh:mm')}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import '../../common/js/formatdate.js';
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartControl from '../../components/cartControl/cartControl.vue';
  import split from '../../components/split/split.vue';
  import ratingSelect from '../../components/ratingSelect/ratingSelect.vue';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '点赞',
          negative: '吐槽'
        }
      };
    },
    components: {
      'v-cartControl': cartControl,
      'v-split': split,
      'v-ratingSelect': ratingSelect
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, ({click: true}));
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) { // 添加商品到购物车
        if (!event._constructed) { // 阻止pc端点击后执行两次
          return;
        }
        Vue.set(this.food, 'count', 1);
        this.$emit('cart-add', event.target); // 传输点击的目标元素
      },
      isContent(onlyContent) { // 获取子组件点击事件传递过来的数据
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      filterRatings(type) { // 获取子组件点击事件传递过来的数据
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      // 判断某条评论是否需要显示
      needShow(type, text) {
        // 只查看有内容的评价，但是该条评论没有内容
        if (this.onlyContent && !text) {
          return false;
        }
        // 查看所有评价或者是该类型的评价
        if (this.selectType === ALL || this.selectType === type) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl"
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    width: 100%
    z-index: food-zindex
    background: #fff
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      .img
        display: block
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        color: #fff
        font-size: 20px
        padding: 10px
        .icon-arrow-lift
          display: block
    .content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        line-height: 14px
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        height: 10px
        font-size: 0
        line-height: 18px
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        .now
          margin-right: 8px
          font-size: 14px
          font-weight: 700
          line-height: 24px
          color: rgb(240, 20, 20)
        .old
          font-size: 10px
          font-weight: 700
          line-height: 24px
          color: rgb(147, 153, 159)
      .cartControl-warpper
        position: absolute
        right: 12px
        bottom: 12px
      .addShopcart
        position: absolute
        right: 18px
        bottom: 18px
        z-index: addShopcart-zindex
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        font-size: 12px
        border-radius: 12px
        color: #fff
        background: rgb(0, 160, 220)
        transition: all 0.2s
        &.addCartMove-enter-active
          transition: all 0.2s
        &.addCartMove-enter
          opacity: 1
        &.addCartMove-enter-to
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        font-size: 14px
        margin-bottom: 6px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        font-size: 12px
        padding: 0 8px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
        margin-left: 18px
      .ratings-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.2))
          .user
            position: absolute
            right: 0
            top: 16px
            font-size: 0
            line-height: 12px
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%

          .time
            display: inline-block
            position: absolute
            left: 0
            top: 16px
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
          .text
            font-size: 12px
            line-height: 24px
            color: rgb(7, 17, 27)
            margin-top: 18px
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 24px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          line-height: 24px
          color: rgb(147, 153, 159)
</style>
