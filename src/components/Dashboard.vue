<template>
  <div class="dashboard">
    <player-view v-if="type == 'Player'"></player-view>
    <admin-view v-if="type == 'Admin'"></admin-view>
    <button type="button" name="button" @click="logOut">Log Out</button>
  </div>
</template>

<script>
import db from '../assets/js/firebaseConfig.js'
import { bus } from '../bus.js'

import playerView from './templates/player-view.vue'
import adminView from './templates/admin-view.vue'

export default {
  name: 'Dashboard',

  data() {
    return {
      current: firebase.auth().currentUser.uid,
    }
  },

  components: {
    playerView,
    adminView
  },

  firebase: function() {
    return {
      player: {
        source: db.ref('players/' + this.current),
        asObject: true
      }
    }
  },

  computed: {
    type() {
      return this.player.type;
    }
  },

  methods: {
    ping() {
      if (this.type == 'Player') {
        console.log('Yep');
      }
    },

    logOut() {
      firebase
        .auth()
        .signOut()
        .then(e => {
          this.$router.replace('login')
        })
    }
  },

  mounted() {}
}
</script>

<style lang="scss">
</style>
