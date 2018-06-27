<template>
  <!--商品页组件-->
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul v-show="goods">
        <li :class="{current: currentIndex === index}" class="menu-item" v-for="(item, index) in goods" :key="index" @click="selectMenu(index, $event)">
          <span class="text border-1px"><v-icon v-show="item.type>0" :iconSize="3" :iconType="item.type"></v-icon>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook" :key="item.index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" :key="food.index">
              <div class="icon" @click="selectFood(food, $event)">
                <img :src="food.icon" width="57px" height="57px">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p v-show="food.description" class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="sell-count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><s class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</s>
                </div>
                <v-cartControl class="cartControl-wrapper" :food="food" @cart-add="_drop"></v-cartControl>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart ref="shopcart" :select-foods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></v-shopcart>
    <v-food :food="selectedFood" ref="vfood"></v-food>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from '../../components/icon/icon.vue';
  import BScroll from 'better-scroll';
  import shopcart from '../../components/shopcart/shopcart.vue';
  import cartControl from '../../components/cartControl/cartControl.vue';
  import food from '../../components/food/food.vue';

  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        // 食物资源数据
        goods: [],
        // 各个食物分类信息距离视口的高度
        listHeight: [],
        // 页面滚动实时高度
        scrollY: 0,
        // 点击的商品
        selectedFood: {}
      };
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 当前位置的上一个listHeight值
          let heightBefore = this.listHeight[i];
          // 当前位置的下一个listHeight值
          let heightAfter = this.listHeight[i + 1];
          // 判断当前处于的食物分类序号
          if (((this.scrollY >= heightBefore) && (this.scrollY < heightAfter)) || (!heightAfter)) {
            return i;
          }
        }
        return 0;
      },
      // 加入购物车的商品
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    components: {
      'v-icon': icon,
      'v-shopcart': shopcart,
      'v-cartControl': cartControl,
      'v-food': food
    },
    methods: {
      // 初始化滚动页面
      _initScroll() {
        // 使用better-scroll插件让左侧菜单和右侧食物信息页面滚动
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true});
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {probeType: 3, click: true});
        // 使用插件提供的方法实时获取右侧滚动时距离视口的高度
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      // 计算每个食物分类的高度
      _calculateHeight() {
        let height = 0;
        this.listHeight.push(height);
        // 获取所有的食物分类li元素，存入foodlist数组
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, $event) {
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
        let ele = foodList[index];
        this.foodScroll.scrollToElement(ele, 300);
      },
      // 点击商品查看商品详情
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        // 调用子组件v-food中的show方法
        this.$refs.vfood.show();
      },
      _drop(target) {
        this.$refs.shopcart.drop(target);
      }
    },
    events: {
      'cart-add'(target) {
        this._drop(target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .goods
    position: absolute
    top: 174px
    bottom: 46px
    left: 0
    display: flex
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        width: 80px
        height: 54px
        line-height: 14px
        box-sizing: border-box
        padding: 0 12px
        &.current
          position: relative
          margin-top: -1px
          z-index: current-zindex //10
          background: #fff
          font-weight: 700
          .text
            border-bottom: 0
        .text
          display: table-cell
          width: 56px
          font-size: 12px
          line-height: 14px
          vertical-align: middle
          color: rgb(7, 17, 27)
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex: 1
      .title
        width: 100%
        height: 26px
        border-left: 2px #d9dde1 solid
        padding-left: 14px
        background: #f3f5f7
        font-size: 12px
        line-height: 26px
        color: rgb(147, 153, 149)
      .food-item
        display: flex
        width: 100%
        box-sizing: padding-box
        padding: 18px
        border-bottom: 1px rgba(7, 17, 27, 0.1) solid
        &:lastChild
          border-bottom: 0
        .icon
          flex: 0 0 57px
          overflow: hidden
          margin-right: 10px
          img
            border-radius: 2px
        .content
          position: relative
          flex: 1
          .name
            margin-top: 2px
            font-size: 14px
            line-height: 14px
            color: rgb(7, 17, 27)
          .description
            margin-top: 8px
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
          .extra
            margin-top: 8px
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
            .sell-count
              margin-right: 6px
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
          .cartControl-wrapper
            position: absolute
            right: 18px
            bottom: 0px

</style>
