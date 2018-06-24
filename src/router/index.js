import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

import goods from '../components/goods/goods.vue';
import ratings from '../components/ratings/ratings.vue';
import seller from '../components/seller/seller.vue';

// 定义路由插件
Vue.use(Router);

// 定义ajax数据交互插件
Vue.use(Resource);

let router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
});
export default router;
// 将goods默认为展示画面
router.push('goods');
