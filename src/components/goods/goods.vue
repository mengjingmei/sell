<template>
  <!--商品页组件-->
  <div class="goods">
    <div class="menu-wrapper">
      <ul v-show="goods">
        <li class="menu-item" v-for="item in goods" :key="item.index">
          <icon v-show="item.type>0" :iconSize="2" :iconType="item.type"></icon>
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from '../../components/icon/icon.vue';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      };
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'icon': icon
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    .foods-wrapper
      flex: 1

</style>
