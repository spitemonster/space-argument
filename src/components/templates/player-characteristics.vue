<template>
  <div id="characteristics">
    <div class="charCard" @click="showThis">
      <h4>brawn</h4>
      <div class="charRank">
        {{ players.brawn }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>agility</h4>
      <div class="charRank">
        {{ players.agility }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>intellect</h4>
      <div class="charRank">
        {{ players.intellect }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>cunning</h4>
      <div class="charRank">
        {{ players.cunning }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>willpower</h4>
      <div class="charRank">
        {{ players.willpower }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>presence</h4>
      <div class="charRank">
        {{ players.presence }}
      </div>
    </div>

    <div v-if="hasForce" class="charCard">
      <h4>force</h4>
      <div class="charRank">
        {{ players.forceRank }}
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import { bus } from '../../bus.js'

export default {
  name: 'player-characteristics',

  data () {
    return {
      current: firebase.auth().currentUser.uid,
      brawn: false,
      agility: false,
      int: false,
      cun: false,
      willpower: false,
      pres: false
    }
  },

  firebase: function() {
    return {
      players: {
        source: db.ref('players/' + this.current),
        asObject: true
      },
      weapons: db.ref('players/' + this.current + '/inventory/weapons'),
      armorInv: db.ref('players/' + this.current + '/inventory/armor'),
    }
  },
  
  computed: {
    hasForce() {
      return this.players.hasForce;
    }
  },

  methods: {
    showThis(e) {
      if (e.target.tagName == 'H4') {
        bus.$emit('showChar', e.target.innerHTML);
      } else if (e.target.parentNode.childNodes[0].tagName == 'H4') {
        bus.$emit('showChar', e.target.parentNode.childNodes[0].innerHTML);
      }
    }
  }
}
</script>

<style>

</style>
