import Vue from 'vue'
import validator from './validator'
import dropdown from './dropdown'



const directives = {
  validator,
  dropdown
}
// 这里使用一个循环，来注册我们的所有指令，Object.entries 返回给定对象的键值对数组，以 Object.entries(directives) 的返回为例：

// [['validator', {...}], ['dropdown', {...}]]
for (const [key, value] of Object.entries(directives)) {
  // 注册全局指令需要使用 Vue.directive，第一个参数 'validator' 是指令名称，第二个参数 validator 是指令对象或者指令函数，我们这里是指令对象
  // Vue.directive('validator', validator)
  Vue.directive(key, value)
}
