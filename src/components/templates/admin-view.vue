<template>
  <div class="admin">
    <section class="party">
      <h3>Party</h3>
      <ul>
        <li v-for="player in players">{{ player.name }}</li>
      </ul>
    </section>
  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import { bus } from '../../bus.js'

export default {
  name: 'admin-view',
  data () {
    return {
    }
  },

  firebase: function() {
    return {
      players: db.ref('players/')
    }
  },

  computed: {
  },

  methods: {
  },

  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.party {
  color: black;
}
</style>
