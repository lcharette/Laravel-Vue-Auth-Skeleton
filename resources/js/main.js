import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
// import { freeSet as icons } from '@coreui/icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import FSidebarNavItem from './components/FSidebarNavItem'
import axios from "axios";
import { AUTH_LOGEDOUT } from "./store/actions/auth";
import { USER_INIT } from "./store/actions/user";

// Register CoreUI 
Vue.use(CoreuiVue)

// Register FA
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Register custom NavItem
Vue.component('FSidebarNavItem', FSidebarNavItem)

Vue.config.performance = true
Vue.prototype.$log = console.log.bind(console)

// Set default axios header for api token
// @see https://stackoverflow.com/a/57666570/445757
const token = localStorage.getItem('access_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

// Configure axios interceptor to logout on 401 error
axios.interceptors.response.use(null, function (error) {
  if (error.response.status === 401) {
    store.dispatch(AUTH_LOGEDOUT)
    router.push('/login')
  }
  return Promise.reject(error)
});

new Vue({
  el: '#app',
  router,
  store,
  icons,
  beforeCreate() { 
    this.$store.commit(USER_INIT);
  },
  template: '<App/>',
  components: {
    App
  }
})
