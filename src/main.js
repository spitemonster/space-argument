// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
let VueFire = require('vuefire')
let firebase = require('firebase')
import App from './App'
import config from './assets/js/firebaseConfig.js'
import router from './router'
require('./assets/js/character.js')

const firebaseApp = firebase.initializeApp(config);
let db = firebaseApp.database();

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
