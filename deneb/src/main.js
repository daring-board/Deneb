import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import './registerServiceWorker'

import App from './App.vue'
import PicObjDet from './components/PicObjDet.vue'
import MovObjDet from './components/MovObjDet.vue'
import PoseNet from './components/PoseNet.vue'
import Deneb from './components/Deneb.vue'
import CodeSearch from './components/CodeSearch.vue'
import Home from './components/Home.vue'
import Attendance from './components/Attendance.vue'
import ML1 from './components/ML1.vue'
import WebVR from './components/WebVR.vue'
import WebVRAndML from './components/WebVRAndML.vue'
import Speech2Text from './components/Speech2Text.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'aframe'
import 'aframe-particle-system-component'
import 'aframe-extras.ocean'
import 'aframe-gradient-sky'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.config.ignoredElements = [
  "a-scene",
  "a-entity",
  "a-camera",
  "a-box",
  "a-sphere",
  "a-cylinder",
  "a-plane",
  "a-sky",
  "a-assets",
  "a-marker",
  "a-marker-camera",
  "a-gradient-sky"
]


const routes = [
  { path: '/', component: Home },
  { path: '/pic-obj-det', component: PicObjDet },
  { path: '/mov-obj-det', component: MovObjDet },
  { path: '/posenet', component: PoseNet },
  { path: '/deneb', component: Deneb },
  { path: '/code_search', component: CodeSearch },
  { path: '/attendance', component: Attendance },
  { path: '/ml1', component: ML1 },
  { path: '/webvr', component: WebVR },
  { path: '/webvr_and_ml', component: WebVRAndML },
  { path: '/speech2text', component: Speech2Text },
]

const router = new VueRouter({
  routes,
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
