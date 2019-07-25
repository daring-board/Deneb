import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import PicObjDet from './components/PicObjDet.vue'
import MovObjDet from './components/MovObjDet.vue'
import PoseNet from './components/PoseNet.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const routes = [
  { path: '/pic-obj-det', component: PicObjDet },
  { path: '/mov-obj-det', component: MovObjDet },
  { path: '/posenet', component: PoseNet },
]

const router = new VueRouter({
  routes,
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
