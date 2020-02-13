import Vue from 'vue'
import VueRouter from 'vue-router'
import Collection from '../views/Collection'
Vue.use(VueRouter)

const routes = [
  // ä¹¦æž¶
  {
    path: '/',
    // component: () => import('../views/Story.vue')
    component: () => import('../views/Story.vue')
  },
  {
    name: 'collection',
    path: '/collection',
    component: Collection
  },
  {
    name: 'story',
    path: '/story',
    component: () => import('../views/Story.vue')
  },
  {
    name: 'book',
    path: '/book/:bookId',
    meta: { hideTab: true },
    component: () => import('../views/Book.vue')
  },
  {
    name: 'reader',
    path: '/reader',
    meta: { hideTab: true },
    component: () => import('../views/Reader.vue')
  }
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/Login.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {  //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();    //如果匹配到正确跳转
  }
});
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.isLogged
//   if (to.path === '/login') {
//     next()
//   } else {
//     isLogin ? next() : next('/login')
//   }
// })

export default router
