import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')//实现路由懒加载，即当路由被访问时才加载对应的组件
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
