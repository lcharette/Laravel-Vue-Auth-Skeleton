import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/dashboard/Dashboard')

// Views - Auth 
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')

// Views - Errors
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const EmptyView = {
  template: '<router-view></router-view>'
}

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: TheContainer,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      }
    ]
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: Page404
      },
      {
        path: '500',
        name: 'Page500',
        component: Page500
      },
    ]
  },
  {
    path: '/',
    redirect: '/login',
    name: 'Auth',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        beforeEnter: ifNotAuthenticated
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        beforeEnter: ifNotAuthenticated
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: Page404
  }
]

export default new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

