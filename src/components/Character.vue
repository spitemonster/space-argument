<template>
  <div class="character">
    <p>
      {{ players.name }}
    </p>
    <p>
      {{ players.skills.astrogation }}
    </p>
    <!-- <button type="button" name="button" @click="test">poop</button> -->
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
  methods: {
  }
}
</script>

<style lang="scss">

</style>
