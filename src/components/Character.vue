<template>
  <div class="character">
    <p>
      {{ players.name }}
    </p>
    <p>
      {{ currentHealth }}
    </p>
  </div>
</template>

<script>
import db from '../assets/js/firebaseConfig.js'

export default {
  name: 'Character',
  data () {
    return {
      current: firebase.auth().currentUser.uid
    }
  },
  firebase: function() {
    return {
      players: {
        source: db.ref('players/' + this.current),
        asObject: true
      }
    }
  },
  computed: {
    currentHealth() {
      return this.players.skills.astrogation - this.players.skills.athletics;
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
