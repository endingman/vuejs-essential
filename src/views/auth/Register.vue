<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">

      <!-- 消息组件 -->
      <!-- 在这里只有 show 这个参数需要在子组件进行修改，所以只在 :show.sync 这里使用它就好了，它算是一种语法糖。 -->
      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名</label>
            <!-- v-model 指令可以在表单 <input> 及 <textarea> 元素上创建双向数据绑定。拿我们这里的代码来说，在用户名框输入值，username 的值也跟着改变，在代码里改变 username，用户名框也会更新到这个值，这样我们取表单值就非常容易了。.trim 是一个修饰符，用于过滤用户输入的首尾空白字符。 -->
            <input v-model.trim="username" v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control" placeholder="请填写用户名">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input id="password" v-model.trim="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label>
            <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="请填写确认密码">
          </div>
          <div class="form-group">
            <label class="control-label">图片验证码</label>
            <input v-model.trim="captcha" v-validator.required="{ title: '图片验证码' }" type="text" class="form-control" placeholder="请填写验证码">
          </div>
          <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
            <div class="captcha vcenter" v-html="captchaTpl"></div>
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> 注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/localStorage'

export default {
  name: 'Register',
  data() {
    return {
      captchaTpl: '', // 验证码模板
      username: '', // 用户名
      password: '', // 密码
      cpassword: '', // 确认密码
      captcha: '', // 验证码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      const { tpl, captcha } = createCaptcha(6)

      this.captchaTpl = tpl
      this.localCaptcha = captcha
    },
    register(e) {
      // 实例的 $nextTick 方法用于在下次 DOM 更新循环结束之后执行延迟回调。在我们的代码里，当我们点击注册按钮后，表单验证指令有为按钮添加一个 canSubmit 的属性，但 DOM 没有立即更新，所以我们需在 $nextTick 的延迟回调里，获取更新后的元素属性，此时的 canSubmit 才是正确的值。

      // 注：nextTick 有一个全局方法 Vue.nextTick，在实例上使用 this.$nextTick，不要忘记 $。
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement

        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      if (this.captcha.toUpperCase() !== this.localCaptcha) {
        this.showMsg('验证码不正确')
        this.getCaptcha()
      } else {
        const user = {
          name: this.username,
          password: this.password,
          avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
        }
        const localUser = this.$store.state.user

        if (localUser) {
          if (localUser.name === user.name) {
            this.showMsg('用户名已存在')
          } else {
            this.login(user)
          }
        } else {
          this.login(user)
        }
      }
    },
    login(user) {
      // 为 => 分发 login 事件，以保存用户信息和登录
      this.$store.dispatch('login', user)
      this.showMsg('注册成功', 'success')
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>
