<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view/>
  </div>
</template>

<script>
  import db from './assets/js/firebaseConfig.js'

  export default {
    name: 'App',
    data() {
      return {
        players: {}
      }
    }
}
</script>

<style lang="scss">
  @import 'src/assets/css/master.scss';
</style>
