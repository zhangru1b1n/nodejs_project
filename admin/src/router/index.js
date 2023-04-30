import { createRouter, createWebHashHistory } from 'vue-router'
import routers from './config'
import store from '@/store'

const routes = [
  {
    path: "/login",
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: "/mainbox",
    name: 'mainbox',
    component: () => import('../views/MainBox.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



router.beforeEach((to, from, next) => {
  if (to.name == 'login') {
    next()
  }
  else {
    if (localStorage.getItem("token")) {

      if (!store.state.isGetterRouter) {
        configRoute()
        next({
          path: to.fullPath
        })

      }
      else {
        next()
      }
    }
    else {
      next('/login')
    }
  }
})

const configRoute = () => {
  //将mainbox的嵌套路由清空(删去再重新添加)
  router.removeRoute('/mainbox')
  router.addRoute({
    path: "/mainbox",
    name: 'mainbox',
    component: () => import('../views/MainBox.vue')
  })

  //添加路由
  routers.forEach(item => {
    checkPermission(item) && router.addRoute('mainbox', item)
  })
  store.commit('changeGetterRouter', true)
}

function checkPermission(item) {
  if (item.requireAdmin) {
    return store.state.userInfo.role === 1
  }
  return true;
}
export default router
