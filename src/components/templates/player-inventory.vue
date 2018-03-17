<template>
  <div id="inventory">

  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import { bus } from '../../bus.js'

export default {
  name: 'player-stats',
  data() {
    return {
      current: firebase.auth().currentUser.uid,
      inventory: false
    }
  },
  firebase: function() {
    return {
      players: {
        source: db.ref('players/' + this.current),
        asObject: true
      },
      weapons: db.ref('players/' + this.current + '/inventory/weapons'),
      armorInv: db.ref('players/' + this.current + '/inventory/armor')
    }
  },
  computed: {
    hasForce() {
      return this.players.hasForce
    }
  },
  created() {
    bus.$on('showChar', data => {
      if (this[data]) {
        ;(this.brawn = false),
          (this.agility = false),
          (this.intellect = false),
          (this.cunning = false),
          (this.willpower = false),
          (this.presence = false),
          (this.force = false),
          (this.inventory = false)
        this[data] = false
      } else if (!this[data]) {
        ;(this.brawn = false),
          (this.agility = false),
          (this.intellect = false),
          (this.cunning = false),
          (this.willpower = false),
          (this.presence = false),
          (this.force = false),
          (this.inventory = false)
        this[data] = true
      }
    })
  }
}
</script>

<style>
#stats {
  color: rgb(99, 99, 99);
  font-weight: 100;
  text-transform: uppercase;
}

#stats h3 {
  font-weight: 100;
}
</style>
