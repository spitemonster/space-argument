<template>
  <div id="app">
    <!-- <nav-menu v-if="logged"></nav-menu> -->
    <router-view/>
    <button type="button" name="button" @click="test">poop</button>
  </div>
</template>

<script>
  import navMenu from './components/templates/nav-menu.vue'
  import db from './assets/js/firebaseConfig.js'

  export default {
    name: 'App',
    components: {
      navMenu,
    },
    data() {
      return {
        players: {},
      }
    },
    computed: {
      logged() {
        // return firebase.auth().currentUser;
        return firebase.auth().currentUser != null;
    }
  },
  methods: {
    test() {
      console.log(firebase.auth().currentUser == true);
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Oxygen+Mono|Roboto:300,400,700');
  @import 'src/assets/css/master.scss';

  #app {
    font-family: 'Roboto';
  }
</style>
