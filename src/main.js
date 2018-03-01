// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
window.Vue = 'Vue';
import App from './App'
import firebase from 'firebase'
// import firebaseui from 'firebaseui'
require('./assets/js/firebaseConfig.js')
import router from './router'

//components
Vue.component('nav-menu', require('./components/templates/nav-menu.vue').default)

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
