// 在 el 元素的上方显示或隐藏一个内容为 title 的提示框
function showTitle(el, title) {
  const popover = getPopover()
  const popoverStyle = popover.style

  if (title === undefined) {
    popoverStyle.display = 'none'
  } else {
    const elRect = el.getBoundingClientRect()
    const elComputedStyle = window.getComputedStyle(el, null)
    const rightOffset = parseInt(elComputedStyle.getPropertyValue('padding-right')) || 0
    const topOffset = parseInt(elComputedStyle.getPropertyValue('padding-top')) || 0

    popoverStyle.visibility = 'hidden'
    popoverStyle.display = 'block'
    popover.querySelector('.popover-content').textContent = title
    popoverStyle.left = elRect.left - popover.offsetWidth / 2 + (el.offsetWidth - rightOffset) / 2 + 'px'
    popoverStyle.top = elRect.top - popover.offsetHeight + topOffset + 'px'
    popoverStyle.display = 'block'
    popoverStyle.visibility = 'visible'
  }
}

// 创建或者返回一个提示框
function getPopover() {
  let popover = document.querySelector('.title-popover')

  if (!popover) {
    const tpl = `
      <div class="popover title-popover top fade in" style="position:fixed;">
        <div class="arrow"></div>
        <div class="popover-content"></div>
      </div>
    `
    const fragment = document.createRange().createContextualFragment(tpl)

    document.body.appendChild(fragment)
    popover = document.querySelector('.title-popover')
  }

  return popover
}

export default {
  // 一个指令定义对象可以提供如下几个钩子函数（均为可选）
  // bind：只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置；
  // inserted：被绑定元素插入父节点时调用；
  // update：所在组件的 VNode（虚拟节点）更新时调用，但是可能发生在其子 VNode 更新之前；
  // componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用；
  // unbind：只调用一次，指令与元素解绑时调用，在这里可以移除绑定的事件和其他数据；
  bind(el, binding, vnode) {

    // el：指令所绑定的元素，可以用来操作 DOM ；
    // binding：一个对象，binding.value 表示指令的绑定值，如 v-title="'我是标题'" 中，绑定值为'我是标题'；
    // vnode：Vue 编译生成的虚拟节点；
    // oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

    // 使用 const 声明一个只读的常量，其值是需要监听的事件类型列表

    const events = ['mouseenter', 'mouseleave', 'click']
    // 声明一个处理器，以根据不同的事件类型传不同的参数
    const handler = (event) => {
      if (event.type === 'mouseenter') {
         // 显示一个提示框
        showTitle(el, binding.value)
      } else {
        // 隐藏一个提示框
        showTitle()
      }
    }



    events.forEach((event) => {
      // 在 el 元素上添加事件监听
      el.addEventListener(event, handler, false)
    })

    // es6箭头函数等价于
    // events.forEach(function (event) {
    //   el.addEventListener(event, handler, false)
    // })

    el.destroy = () => {
      events.forEach((event) => {
        el.removeEventListener(event, handler, false)
      })
      // 移除 el 元素上的 destroy
      el.destroy = null
    }
  },
  unbind(el) {
    el.destroy()
  }
}
