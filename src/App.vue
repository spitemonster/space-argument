<template>
  <div id="app">
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
    },

    firebase: {
      players: {
        source: db.ref('players'),
        cancelCallback(err) {
        console.error(err);
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'src/assets/css/master.scss';
</style>
