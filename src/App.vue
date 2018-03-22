<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import navMenu from './components/templates/nav-menu.vue'
import db from './assets/js/firebaseConfig.js'

export default {
  name: 'App',
  components: {
    navMenu
  },
  data() {
    return {
      players: {}
    }
  },
  computed: {
  },
  methods: {},
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Oxygen+Mono|Roboto:300,400,700');
// @import 'src/assets/css/master.scss';
@import 'src/assets/css/_variables.scss';
@import 'src/assets/css/_reset.scss';
@import 'src/assets/css/_global.scss';

body {
  background: $black;
}

#app {
  background: $white;
  position: relative;
  top: 0;
  height: 100vh;
  width: 80%;
  margin: 0 auto;

  @media (min-width: 960px) {
    min-width: 960px;
  }

  @media (max-width: 959px) {
    min-width: none;
    width: 100%;
  }
}

</style>
