// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Firebase from 'firebase'
import VueFire from 'vuefire'
import App from './App'
import db from './assets/js/firebaseConfig.js'
import router from './router'

Vue.use(VueFire)

let app = new Vue({
  el: '#app',
  data: {
    info: null,
  },
  components: {
  },
  firebase() {

  },
  router,
  components: { App },
  template: '<App/>',
  mounted() {
  }
});
