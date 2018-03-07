<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view/>
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
        players: {}
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
