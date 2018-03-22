<template>
  <div class="dashboard">
    <nav-menu></nav-menu>
    <player-view
      v-if="type == 'Player'"
      :dashboard="viewDashboard"
      :brief="viewBriefs"
      :party="viewParty" ></player-view>
    <admin-view
      v-if="type == 'Admin'"
      :dashboard="viewDashboard"
      :brief="writeBrief"
      :party="viewParty" ></admin-view>
    <button type="button" name="button" @click="logOut">Log Out</button>
  </div>
</template>

<script>
import db from '../assets/js/firebaseConfig.js'
import { bus } from '../bus.js'

import navMenu from './templates/nav-menu.vue'
import playerView from './templates/player-view.vue'
import adminView from './templates/admin-view.vue'

export default {
  name: 'Dashboard',

  data() {
    return {
      current: firebase.auth().currentUser.uid,
      viewDashboard: false,
      writeBrief: false,
      viewBriefs: false,
      viewParty: false,
    }
  },

  components: {
    navMenu,
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
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(e => {
          this.$router.replace('login')
        })
    }
  },

  created() {
    bus.$on('setFocus', (data) => {
      if (data == 'dashboard') {
        this.viewDashboard = true;
        this.writeBrief = false;
        this.viewBriefs = false;
        this.viewParty = false;
      } else if (data == 'write brief') {
        this.viewDashboard = false;
        this.writeBrief = true;
        this.viewBriefs = false;
        this.viewParty = false;
      } else if (data == 'briefs') {
        this.viewDashboard = false;
        this.writeBrief = false;
        this.viewBriefs = true;
        this.viewParty = false;
      } else if (data == 'party') {
        this.viewDashboard = false;
        this.writeBrief = false;
        this.viewBriefs = false;
        this.viewParty = true;
      }
    });
  }
}
</script>

<style lang="scss">
@import '../assets/css/_variables.scss';
  .dashboard {
    height: 100%;
  }
</style>
