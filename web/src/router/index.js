import { createRouter, createWebHashHistory } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('@/views/Home.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: ()=>import('@/views/News.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: ()=>import('@/views/Product.vue')
  },
  {
    path: '/newsdetail/:id',
    name: 'newsdetail',
    component: ()=>import('@/views/NewsDatail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})

router.afterEach((to, from) => {
  // to and from are both route objects.
  nprogress.done()
})

export default router
