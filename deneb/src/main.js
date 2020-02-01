import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import App from './App.vue'
import PicObjDet from './components/PicObjDet.vue'
import MovObjDet from './components/MovObjDet.vue'
import PoseNet from './components/PoseNet.vue'
import Deneb from './components/Deneb.vue'
import CodeSearch from './components/CodeSearch.vue'
import Home from './components/Home.vue'
import Attendance from './components/Attendance.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

const routes = [
  { path: '/', component: Home },
  { path: '/pic-obj-det', component: PicObjDet },
  { path: '/mov-obj-det', component: MovObjDet },
  { path: '/posenet', component: PoseNet },
  { path: '/deneb', component: Deneb },
  { path: '/code_search', component: CodeSearch },
  { path: '/attendance', component: Attendance}
]

const router = new VueRouter({
  routes,
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
