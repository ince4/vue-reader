import Vue from 'vue'
import VueRouter from 'vue-router'
import Collection from '../views/Collection'
Vue.use(VueRouter)

const routes = [
  // ä¹¦æž¶
  {
    path: '/',
    // component: () => import('../views/Story.vue')
    component: () => import('../views/Book.vue')
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection
  },
  {
    path: '/story',
    name: 'story',
    component: () => import('../views/Story.vue')
  },
  {
    path: '/book/:bookId',
    name: 'book',
    meta: { hideTab: true },
    component: () => import('../views/Book.vue')
  },
  {
    path: '/reader',
    name: 'reader',
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

// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.isLogged
//   if (to.path === '/login') {
//     next()
//   } else {
//     isLogin ? next() : next('/login')
//   }
// })

export default router
