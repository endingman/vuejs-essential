import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

Vue.use(Vuex)

// store（仓库）实例，其配置项说明：

// state：共享的状态，我们不能直接更改状态，但是可以像 store.state.user 这样访问一个状态；

// mutations：更改状态的方法，我们可以在这里更改状态，调用方法是像 store.commit('UPDATE_USER', user) 这样提交一个事件类型，这里不能包含异步操作；

// actions：类似于 mutations，但我们不在这里直接更改状态，而是提交前面的 mutation，调用方法是像 store.dispatch('login') 这样分发一个事件，这里可以包含异步操作；
const state = {//共享的状态，我们不能直接更改状态
  user: ls.getItem('user'),
  // 添加 auth 来保存当前用户的登录状态
  auth: ls.getItem('auth')
}

const mutations = {//这里更改状态，
  UPDATE_USER(state, user) {
    state.user = user
    ls.setItem('user', user)
  },
   // 添加 UPDATE_AUTH 来更改当前用户的登录状态
  UPDATE_AUTH(state, auth) {
    state.auth = auth
    ls.setItem('auth', auth)
  }
}

const actions = {//不在这里直接更改状态，提交的是前面的mutations
  login({ commit }, user) {
    // { commit } 相当于 { commit ：commit }
    if (user) commit('UPDATE_USER', user)
    // 更新当前用户的登录状态为已登录
    commit('UPDATE_AUTH', true)

      // 首先你要明白 action 的第一个参数是一个与仓库实例具有相同方法和属性的 context 对象，因此我们可以调用 context.commit 提交一个事件类型，上面的 login 在第一个参数使用了 解构赋值 来简化代码，不使用解构赋值时等价于：

      // login(context, user) {
      //   if (user) context.commit('UPDATE_USER', user)
      //   router.push('/')
      // }

    router.push('/')
    // push 是路由的一个方法，用来跳转到一个新的地址，第一个参数是字符串或者一个描述地址对象，例如：

    // 字符串
    // router.push('/')

    //  含路径的对象
    // router.push({ path: '/' })

    //  含命名的对象
    // router.push({ name: 'Home' })

    //  含参数和查询参数的对象
    // router.push({ params: { id: 1 }, query: { page: 1 } })
    /**
     * 当 <router-link> 被点击后，to 的值就会传到 router.push()，所以 to 的值有以下相应的写法：
    <!-- 字符串 -->
    <router-link to="/">Home</router-link>

    <!-- 含路径的对象 -->
    <router-link :to="{ path: '/' }">Home</router-link>

    <!-- 含命名的对象 -->
    <router-link :to="{ name: 'Home' }">Home</router-link>

    <!-- 含参数和查询参数的对象 -->
    <router-link :to="{ params: { id: 1 }, query: { page: 1 } }">Home</router-link>
     */
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
