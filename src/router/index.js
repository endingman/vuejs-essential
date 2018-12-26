import Vue from 'vue'
import Router from 'vue-router'

// 引入 ./routes.js 的默认值
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // linkExactActiveClass 的值是一个类名，用来添加到与当前路由对应的 <router-link> 上，以显示当前精确激活的 <router-link>，其默认值是 'router-link-exact-active'，我们这里改为 'active' 以利用 Bootstrap 的激活样式
  linkExactActiveClass: 'active',
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {

  const app = router.app
  const store = app.$options.store
  // 获取仓库里的登录信息
  const auth = store.state.auth

   // 获取目标页面路由参数里的 articleId
  const articleId = to.params.articleId

  app.$message.hide()

  if (auth && to.path.indexOf('/auth/') !== -1 ||
    (!auth && to.meta.auth) ||
    // 有 articleId 且不能找到与其对应的文章时，跳转到首页
    (articleId && !store.getters.getArticleById(articleId))) {
    // 如果当前用户已登录，且目标路由包含 /auth/ ，就跳转到首页
    next('/')
  } else {
    next()
  }
})

// 注册全局后置钩子
router.afterEach((to, from) => {
  const app = router.app
  const store = app.$options.store
  const showMsg = to.params.showMsg

  if (showMsg) {
    if (typeof showMsg === 'string') {
      app.$message.show(showMsg)
    } else {
      app.$message.show('操作成功')
    }
  }
})

export default router
