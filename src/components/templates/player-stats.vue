<template>
  <div id="stats">
    <div class="statSection" v-if="brawn">
      <div class="statsGrid">
        <h3>Athletics: <span>{{ players.skills.athletics }}</span></h3>
        <h3>Resilience: <span>{{ players.skills.resilience }}</span></h3>
        <h3>Brawl: <span>{{ players.skills.brawl }}</span></h3>
        <h3>Melee: <span>{{ players.skills.melee }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="agility">
      <div class="statsGrid">
        <h3>Coordination: <span>{{ players.skills.coordination }}</span></h3>
        <h3>Piloting (Planetary): <span>{{ players.skills.pilotingPlanetary }}</span></h3>
        <h3>Piloting (Space): <span>{{ players.skills.pilotingSpace }}</span></h3>
        <h3>Stealth: <span>{{ players.skills.stealth }}</span></h3>
        <h3>Ranged (Light): <span>{{ players.skills.rangedLight }}</span></h3>
        <h3>Ranged (Heavy): <span>{{ players.skills.rangedHeavy }}</span></h3>
        <h3>Gunnery: <span>{{ players.skills.gunnery }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="intellect">
      <div class="statsGrid">
        <h3>Astrogation: <span>{{ players.skills.astrogation }}</span></h3>
        <h3>Computers: <span>{{ players.skills.computers }}</span></h3>
        <h3>Mechanics: <span>{{ players.skills.mechanics }}</span></h3>
        <h3>Medicine: <span>{{ players.skills.medicine }}</span></h3>

        <h2>Knowledge</h2>

        <h3>Core Worlds <span>{{ players.skills.coreWorlds }}</span></h3>
        <h3>Education: <span>{{ players.skills.education }}</span></h3>
        <h3>Lore: <span>{{ players.skills.lore }}</span></h3>
        <h3>Outer Rim: <span>{{ players.skills.outerRim }}</span></h3>
        <h3>Underworld: <span>{{ players.skills.underworld }}</span></h3>
        <h3>Warfare: <span>{{ players.skills.warfare }}</span></h3>
        <h3>Xenology: <span>{{ players.skills.xenology }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="cunning">
      <div class="statsGrid">
        <h3>Deception: <span>{{ players.skills.deception }}</span></h3>
        <h3>Perception: <span>{{ players.skills.perception }}</span></h3>
        <h3>Skulduggery: <span>{{ players.skills.skulduggery }}</span></h3>
        <h3>Streetwise: <span>{{ players.skills.streetwise }}</span></h3>
        <h3>Survival: <span>{{ players.skills.survival }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="willpower">
      <div class="statsGrid">
        <h3>Coercion: <span>{{ players.skills.coercion }}</span></h3>
        <h3>Discipline: <span>{{ players.skills.discipline }}</span></h3>
        <h3>Vigilance: <span>{{ players.skills.skulduggery }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="presence">
      <div class="statsGrid">
        <h3>Charm: <span>{{ players.skills.charm }}</span></h3>
        <h3>Cool: <span>{{ players.skills.cool }}</span></h3>
        <h3>Leadership: <span>{{ players.skills.leadership }}</span></h3>
        <h3>Negotiation: <span>{{ players.skills.negotiation }}</span></h3>
      </div>
    </div>
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
      brawn: false,
      agility: false,
      intellect: false,
      cunning: false,
      willpower: false,
      presence: false,
      force: false,
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
