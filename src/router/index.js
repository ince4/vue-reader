import Vue from 'vue'
import VueRouter from 'vue-router'
import Story from '../views/Story.vue'
Vue.use(VueRouter)

const routes = [
  // 书架
  {
    path: '/',
    component: Story
  },
  {
    path: '/story',
    name: 'story',
    component: Story
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import('../views/Collection.vue')
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
