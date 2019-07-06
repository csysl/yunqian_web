import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../views/base/Base.vue'], resolve),
      meta: {title: '首页'}
    },
    {
      path: '/403',
      component: resolve => require(['../views/Page403.vue'], resolve),
      meta: {title: '403页面'}
    },
    {
      path: '/404',
      component: resolve => require(['../views/Page404.vue'], resolve),
      meta: {title: '404页面'}
    },
    {
      path: '/500',
      component: resolve => require(['../views/Page500.vue'], resolve),
      meta: {title: '500页面'}
    },
    {
      path: '/login',
      component: resolve => require(['../views/index.vue'], resolve),
      meta: {title: '登陆页面'}
    },
    {
      path: '/resetpassword',
      component: resolve => require(['../views/ResetPassword.vue'], resolve),
      meta: {title: '重置密码'}
    },
    {
      path: '/base',
      meta: {
        title: 'base',
        requiresAuth: true
      },
      component: (resolve) => require(['../views/base/Base.vue'], resolve),
      children:[
        {
          path: 'user',
          name:'user',
          component: resolve => require(['../views/user.vue'], resolve),
          meta: {title: '角色页面'}
        },
        {
          path: 'home',
          name: 'home',
          component: (resolve) => require(['../views/Home.vue'], resolve),
          meta: {
            title:"welcome"
          }
        },
        {
          path: 'role',
          name:'role',
          component: resolve => require(['../views/role.vue'], resolve),
          meta: {title: '角色页面'}
        },
        {
          path: 'menu',
          name:'menu',
          component: resolve => require(['../views/menu.vue'], resolve),
          meta: {title: '菜单界面'}
        },
      ]
    }

  ]
})
