import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login/index.vue'
// import Home from '@/views/Home/index.vue'
// import User from '@/views/User/'
// import Layout from '@/views/Layout/index.vue'
// import Search from '@/views/Search/index.vue'
// import SearchResult from '@/views/Search/SearchResult.vue'
// import ArticleDetail from '@/views/ArticleDetail/index.vue'
// import UserEdit from '@/views/User/UserEdit.vue'
// import Chat from '@/views/Chat/index.vue'
import { getToken } from '@/utils/token.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login/index.vue'),
    beforeEnter: (to, from, next) => {
      if (getToken()?.length > 0) {
        next('/layout/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */ '@/views/Search/index.vue')
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/index.vue'),
        meta: { scrollT: 0 }
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "User" */ '@/views/User/index.vue')
      }
    ]
  },
  {
    path: '/search_result:kw',
    component: () => import(/* webpackChunkName: "SearchResult" */ '@/views/Search/SearchResult.vue')
  },
  {
    path: '/detail',
    component: () => import(/* webpackChunkName: "Detail" */ '@/views/ArticleDetail/index.vue')
  },
  {
    path: '/user-edit',
    component: () => import(/* webpackChunkName: "UserEdit" */ '@/views/User/UserEdit.vue')
  },
  {
    path: '/chat',
    component: () => import(/* webpackChunkName: "Chat" */ '@/views/Chat/index.vue')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (getToken()?.length > 0 && to.path === '/login') {
//     next('/layout/home')
//   } else {
//     next()
//   }
// })
export default router
