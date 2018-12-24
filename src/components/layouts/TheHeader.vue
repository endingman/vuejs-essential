<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" @click="toggleNav">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <a href="/" class="navbar-brand">
          <!-- {{ logo.title }}：Vue.js 使用 Mustache 语法 （双大括号）进行数据绑定，这里的 logo 是数据对象 data 里的 logo； -->
          <span class="title">{{ logo.title }}</span>
          <!-- src 和 alt 都是 HTML 特性，不能使用 Mustache 语法，而要使用 v-bind 指令，:src 是 v-bind:src 的缩写 -->
          <img :src="logo.src" :alt="logo.title">
        </a>

      </div>
      <!-- 'collapse' 和 'navbar-collapse' 是默认要应用的类名，只有当 showCollapsedNav 返回 true 时才添加 'in' 这个类名 -->
      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <ul class="nav navbar-nav">
          <!-- v-for 支持一个可选的第二个参数为当前项的索引，该索引从 0 开始，对应我们这里的 index -->
          <li v-for="(item, index) in navList" :class="{ active: index === activeNavIndex }">
            <!-- @click 是 v-on:click 指令的缩写 -->
            <a href="#" @click="changeNavIndex(index)">{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      logo: {
        // src 的值是用反引号（`）标识的模板字符串，我们只需将变量放在 ${} 的大括号之中
        src: `${this.uploadsUrl}sites/ByvFbNlQYVwhvTyBgLdqitchoacDNznN.jpg`,
        title: 'VuejsCaff'
      },
      navList: ['社区', '头条', '问答', '教程'],
      activeNavIndex: 0, //当前点击的导航的索引 activeNavIndex
      showCollapsedNav: false
    }
  },
  beforeCreate() { //es6用法
    this.uploadsUrl = 'https://vuejscaffcdn.phphub.org/uploads/'
  },

  // 等价于
  // beforeCreate: function beforeCreate() {
  //   this.uploadsUrl = 'https://vuejscaffcdn.phphub.org/uploads/'
  // }


  methods: {
    changeNavIndex(index) {
      this.activeNavIndex = index
    },
     toggleNav() {
      this.showCollapsedNav = !this.showCollapsedNav
    }
  }

}

</script>
<style scoped>
/*scoped 当前组件有效*/
.title {
  display: none;
}

.navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}

</style>
