import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'background',
      component: () => import("@/components/background")
    },
    {
      path: '/sea',
      name: 'sea',
      component: () => import("@/components/sea")
    },
    // {
    //   path:"/navbar",
    //   name:"navbar",
    //   component: () => import("@/components/nav")
    // }
  ]
})
