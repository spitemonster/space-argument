// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Firebase from 'firebase'
import VueFire from 'vuefire'
import App from './App'
import db from './assets/js/firebaseConfig.js'
import router from './router'
require('./assets/js/character.js')

Vue.use(VueFire)

Vue.component('nav-menu', './components/templates/nav-menu');

let app = new Vue({
  el: '#app',
  data: {
    info: null,
  },
  firebase: function() {
      return {
        players: db.ref('players/')
      }
  },
  router,
  components: { App, },
  template: '<App/>',
  mounted: function() {
      db.ref('players/0v6I9fk4Nlgp1iU9Qz62S2ck11z1').once('value', (data) => {
        this.info = data.val();
      })
    }
});
