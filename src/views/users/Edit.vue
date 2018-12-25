<template>
  <div class="users-show">
    <div class="col-md-3 main-col">
      <div class="box">
        <div class="padding-md">
          <div class="list-group text-center">
            <!-- <router-link> 是路由定义的组件，在组件上使用 v-for 指令进行渲染的时候，需要添加 key。它可以方便 Vue 跟踪每个节点的身份，从而重用和重新排序现有元素。每一项的 key 应该是惟一的，我们这里的 key 值使用链接的 name 属性。 -->
            <router-link v-for="link in links" :key="link.name" :to="`/users/1/${link.name}`" class="list-group-item">
              <i :class="`text-md fa fa-${link.icon}`"></i>
              {{ link.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'UsersEdit',
  data() {
    return {
      links: [
        {
          name: 'edit',
          title: '个人信息',
          icon: 'list-alt'
        },
        {
          name: 'edit_avatar',
          title: '修改头像',
          icon: 'picture-o'
        },
        {
          name: 'edit_password',
          title: '修改密码',
          icon: 'lock'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
