export default [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login')
  },
  // EditUsers
  {
    path: '/users/1/edit',
    name: 'EditUsers',
    component: () => import('@/views/users/Edit.vue'),
    // Profile.vue 作为 Edit.vue 的嵌套子页面，我们需要在父级添加 children 选项以指定子路由的配置；
    // 子路由的 path 为空值 ''，表示该页面作为默认子路由，在导航到父级路由（/users/1/edit）时，就开始加载；
    // 使用 meta 选项配置路由的元信息，其值可以是任意类型的数据，我们可以从路由对象中访问该值，如 to.meta.auth；
     children: [
      {
        path: '',
        name: 'EditProfile',
        component: () => import('@/views/users/Profile.vue'),
        // auth 为 true，标识当前路由需要登录才能访问
        meta: { auth: true }
      },
        // EditAvatar
      {
        path: '/users/1/edit_avatar',
        name: 'EditAvatar',
        component: () => import('@/views/users/Avatar.vue'),
        meta: { auth: true }
      },
       // EditPassword
      {
        path: '/users/1/edit_password',
        name: 'EditPassword',
        component: () => import('@/views/users/Password.vue'),
        meta: { auth: true }
      }
    ]
  },
]
