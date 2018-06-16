<template>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
      <router-view>哈哈哈</router-view>
    </div>
</template>

<script>
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display : flex
      width : 100%
      height : 40px
      line-height : 40px
      .tab-item
        flex : 1
        text-align : center
</style>
