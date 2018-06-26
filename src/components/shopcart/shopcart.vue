<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleList">
        <div class="logo-wrapper">
          <div class="logo" :class="{hightLight: totalCount>0}">
            <span class="icon-shopping_cart" :class="{hightLight: totalCount>0}"></span>
          </div>
          <div v-show="totalCount>0" class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{hightLight: totalPrice>0}">￥{{totalPrice}}</div>
        <div class="description">配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click="pay">
        <div class="pay" :class="{hightLight: totalPrice>=minPrice}">{{payDesc}}</div>
      </div>
      <div class="ball-container">
        <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index" transition="drop">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <div class="shopcart-list" v-show="listShow()">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul v-show="selectFoods.length">
            <li v-for="(food,index) in selectFoods" :key="index" class="food">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartControl_wrapper">
                <cartControl :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="list-mask" v-show="listShow()" @click="hideShow"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartControl from '../../components/cartControl/cartControl.vue';

  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        // 判断购物车列表是否展开变量
        unfold: false
      };
    },
    computed: {
      totalPrice() {
        let price = 0;
        this.selectFoods.forEach((food) => {
          price += food.price * food.count;
        });
        return price;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice <= 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          return `还差${this.minPrice - this.totalPrice}元起送`;
        } else {
          return '去结算';
        }
      }
    },
    methods: {
      // 将激活的小球及其对应的el放入dropBalls中
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      // 动画前的处理函数：获取激活状态的购物车小球的落点位置
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;

            let inner = el.querySelector('.inner-hook');
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {
        /* eslint-disable no-unused-vars */
        let temp = el.offsetHeight; // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';

          let inner = el.querySelector('.inner-hook');
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      // 判断购物车列表是否展开
      toggleList() {
        // 购物车食品数量为0
        if (!this.totalCount) {
          this.unfold = false;
        } else {
          this.unfold = !(this.unfold);
        }
      },
      listShow() { // 判断是否展开详情页
        let show = this.unfold;
        if (show) {
          // 让购物车页面有滚动效果
          this.$nextTick(() => {
            if (!this.scroll) { // 页面滚动
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();// 刷新
            }
          });
        }
        return ((this.unfold) && (this.totalCount > 0));
      },
      // 清空购物车
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
        this.unfold = false;
      },
      // 隐藏购物车
      hideShow() {
        this.unfold = false;
      },
      // 支付
      pay() {
        if (this.totalPrice < this.minPrice) {
          return 0;
        }
        alert('请支付' + this.totalPrice + this.deliveryPrice + '元');
      }
    },
    components: {
      'cartControl': cartControl
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    z-index: 50
    height: 48px
    width: 100%
    .content
      display: flex
      .content-left
        flex: 1
        background: #141d27
        z-index: 20
        .logo-wrapper
          display: inline-block
          font-size: 0
          position: relative
          top: -10px
          box-sizing: border-box
          margin-left: 12px
          margin-right: 8px
          padding: 6px
          width: 56px
          height: 56px
          border-radius: 50%
          vertical-align: top
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            box-sizing: border-box
            vertical-align: top
            z-index: 60
            background: rgba(43, 52, 60, 0.8)
            text-align: center
            &.hightLight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: rgba(255, 255, 255, 0.4)
              &.hightLight
                color: rgb(255, 255, 255)
        .num
          position: absolute
          right: 0
          top: 0
          width: 24px
          height: 16px
          border-radius: 8px
          font-size: 9px
          font-weight: 700
          line-height: 16px
          text-align: center
          background: rgb(240, 20, 20)
          color: rgb(255, 255, 255)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          box-sizing: border-box
          padding-right: 12px
          margin-bottom: 12px
          margin-top: 12px
          font-size: 16px
          font-weight: 700
          line-height: 24px
          border-right: 1px rgba(255, 255, 255, 0.1) solid
          color: rgba(255, 255, 255, 0.4)
          &.hightLight
            color: rgb(255, 255, 255)
        .description
          height: 100%
          display: inline-block
          box-sizing: border-box
          padding: 0 12px
          margin-top: 12px
          font-size: 10px
          line-height: 24px
          color: rgba(255, 255, 255, 0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        z-index: 20
        .pay
          height: 48px
          line-height: 48px
          box-sizing: border-box
          background: rgba(43, 52, 60, 0.6)
          text-align: center
          font-size: 14px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          &.hightLight
            background: #00b43c
            color: #fff
      .ball-container
        .ball
          position: fixed
          left: 32px
          bottom: 22px
          z-index: 200
          &.drop-enter-active, &.drop-enter {
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          }
          .inner
            display: inline-block
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.4s linear
      .shopcart-list
        position: fixed
        left: 0
        bottom: 48px
        width: 100%
        background: #fff
        font-size: 0
        z-index: 12
        .list-header
          position: relative
          width: 100%
          height: 40px
          background: #f3f5f7
          box-sizing: border-box
          padding: 0 18px
          border-bottom: 1px rgba(7, 17, 27, 0.1) solid
          .title
            display: inline-block
            position: absolute
            left: 18px
            font-size: 14px
            font-weight: 200
            line-height: 40px
            color: rgb(7, 17, 27)
          .empty
            display: inline-block
            position: absolute
            right: 18px
            font-size: 12px
            line-height: 40px
            color: rgb(0, 160, 220)
        .list-content
          max-height: 217px
          overflow: hidden
          padding-right: 18px
          padding-left: 18px
          .food
            position: relative
            width: 100%
            height: 48px
            box-sizing: border-box
            padding: 12px 0
            border-bottom: 1px rgba(7, 17, 27, 0.1) solid
            .name
              display: inline-block
              font-size: 14px
              line-height: 24px
              color: rgb(7, 17, 27)
            .price
              position: absolute
              right: 90px
              bottom: 12px
              font-size: 14px
              line-height: 24px
              font-weight: 700
              color: rgb(240, 20, 20)
              margin-left: 18px
              padding: 0 12px
            .cartControl_wrapper
              position: absolute
              right: 0
              top: 6px
      .list-mask
        position: fixed
        top: -20%
        left: -20%
        width: 200%
        height: 200%
        z-index: 5
        background: rgba(7, 17, 27, 0.6)
        filter: blur(10px)
        backdrop-filter: blur(10px)
</style>
