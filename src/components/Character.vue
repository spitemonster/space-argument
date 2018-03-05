<template>
  <div class="character">
    <p>
      {{ players.name }}
    </p>
    <p>
      {{ players.strainThresh }}
    </p>
  </div>
</template>

<script>
import db from '../assets/js/firebaseConfig.js'

export default {
  name: 'Character',
  data () {
    return {
      current: ''
    }
  },
  firebase: {
    players: {
      source: db.ref('players/' + firebase.auth().currentUser.uid),
      asObject: true
    }
  },
  mounted: function() {
    // this.current = firebase.auth().currentUser.uid;
  }
}
</script>

<style lang="scss">

</style>
