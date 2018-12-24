<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  beforeRouteEnter(to, from, next) {
    /**
     beforeRouteEnter 是组件内的路由导航守卫，在确认渲染该组件的对应路由前调用。该守卫不能访问 this，但我们通过传一个回调给 next，就可以使用上面的 vm 来访问组件实例。守卫的参数说明如下：

    to：即将要进入的目标路由；
    from：当前导航正要离开的路由，from.name 是路由的名称，对应路由配置中的 name；
    next：一个用来 resolve 当前钩子的方法，需要调用该方法来确认或者中断导航；
    参数 to 和 from 都是 路由对象 （route object），表示当前激活的路由的状态信息，其常用的属性有：

    name：路由的名称，如 'Register'；
    path：路由的路径，如 '/auth/register'；
    params：路由参数对象，如 { id: "1" }；
    query：URL 查询参数对象，如 { page: "1" }；
    meta：元信息对象，如 { auth: true }；
     **/
    const fromName = from.name

    next(vm => {
      // 官网原话：虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。

      // =>var vm=new Vue({})
      // var app =new Vue({})

      if (vm.$store.state.auth) {
        switch (fromName) {
          case 'Register':
            vm.showMsg('注册成功')
            break
        }
      }
    })
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    }
  }
}
</script>

<style scoped>

</style>
