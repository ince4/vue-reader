import Vue from 'vue'
import VueRouter from 'vue-router'
import Collection from '../views/Collection'
Vue.use(VueRouter)

const routes = [
  // ä¹¦æž¶
  {
    path: '/',
    // component: () => import('../views/Story.vue')
    component: Collection
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
  },
  {
    name: 'catalogue',
    path: '/catalogue',
    meta: { hideTab: true },
    component: () => import('../views/Catalogue.vue')
  },
  {
    name: 'discovery',
    path: '/discovery',
    component: () => import('../views/Discovery.vue')
  },
  {
    name: 'booklist',
    path: '/booklist',
    component: () => import('../views/BookList.vue')
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
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/')
  } else {
    next()
  }
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
