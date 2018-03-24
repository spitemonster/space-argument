<template>
  <div class="dashboard">
    <nav-menu :type="type"></nav-menu>
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
    <button type="button" name="button" @click="logOut" class="log-out">Log Out</button>
  </div>
</template>

<script>
//firebase config
import db from '../assets/js/firebaseConfig.js'
//should be obvious
import { bus } from '../bus.js'
import navMenu from './templates/nav-menu.vue'
import playerView from './templates/player-view.vue'
import adminView from './templates/admin-view.vue'

export default {
  name: 'Dashboard',

  components: {
    navMenu,
    playerView,
    adminView,
  },

  firebase: function() {
    return {
      player: {
        source: db.ref('players/' + this.current),
        asObject: true
      }
    }
  },

  data() {
    return {
      viewDashboard: true,
      writeBrief: false,
      viewBriefs: false,
      viewParty: false,
      userType: this.type,
      current: firebase.auth().currentUser.uid
    }
  },

  computed: {
    //using just data did not behave how i wanted, especially with regard to passing data via props, so here we are

    type() {
      return this.player.type;
    }
  },

  methods: {
    //logout and redirect to login page. this will probably, eventually, be moved to nav.
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
    //will probably comeback and try to rewrite this. sets which view will be active, whether it's player or admin
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
  },

  mounted() {
  }
}
</script>

<style lang="scss">
@import '../assets/css/_variables.scss';
  .dashboard {
    height: 100%;
  }

  .log-out {
    padding: 1rem;
  }
</style>
