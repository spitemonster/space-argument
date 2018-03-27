<template>
  <div id="stats">
    <div class="statSection" v-if="brawn">
      <div class="statsGrid">
        <h3>Athletics: <span>{{ skills.athletics }}</span></h3>
        <h3>Resilience: <span>{{ skills.resilience }}</span></h3>
        <h3>Brawl: <span>{{ skills.brawl }}</span></h3>
        <h3>Melee: <span>{{ skills.melee }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="agility">
      <div class="statsGrid">
        <h3>Coordination: <span>{{ skills.coordination }}</span></h3>
        <h3>Piloting (Planetary): <span>{{ skills.pilotingPlanetary }}</span></h3>
        <h3>Piloting (Space): <span>{{ skills.pilotingSpace }}</span></h3>
        <h3>Stealth: <span>{{ skills.stealth }}</span></h3>
        <h3>Ranged (Light): <span>{{ skills.rangedLight }}</span></h3>
        <h3>Ranged (Heavy): <span>{{ skills.rangedHeavy }}</span></h3>
        <h3>Gunnery: <span>{{ skills.gunnery }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="intellect">
      <div class="statsGrid">
        <h3>Astrogation: <span>{{ skills.astrogation }}</span></h3>
        <h3>Computers: <span>{{ skills.computers }}</span></h3>
        <h3>Mechanics: <span>{{ skills.mechanics }}</span></h3>
        <h3>Medicine: <span>{{ skills.medicine }}</span></h3>

        <h2>Knowledge</h2>

        <h3>Core Worlds <span>{{ skills.coreWorlds }}</span></h3>
        <h3>Education: <span>{{ skills.education }}</span></h3>
        <h3>Lore: <span>{{ skills.lore }}</span></h3>
        <h3>Outer Rim: <span>{{ skills.outerRim }}</span></h3>
        <h3>Underworld: <span>{{ skills.underworld }}</span></h3>
        <h3>Warfare: <span>{{ skills.warfare }}</span></h3>
        <h3>Xenology: <span>{{ skills.xenology }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="cunning">
      <div class="statsGrid">
        <h3>Deception: <span>{{ skills.deception }}</span></h3>
        <h3>Perception: <span>{{ skills.perception }}</span></h3>
        <h3>Skulduggery: <span>{{ skills.skulduggery }}</span></h3>
        <h3>Streetwise: <span>{{ skills.streetwise }}</span></h3>
        <h3>Survival: <span>{{ skills.survival }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="willpower">
      <div class="statsGrid">
        <h3>Coercion: <span>{{ skills.coercion }}</span></h3>
        <h3>Discipline: <span>{{ skills.discipline }}</span></h3>
        <h3>Vigilance: <span>{{ skills.skulduggery }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="presence">
      <div class="statsGrid">
        <h3>Charm: <span>{{ skills.charm }}</span></h3>
        <h3>Cool: <span>{{ skills.cool }}</span></h3>
        <h3>Leadership: <span>{{ skills.leadership }}</span></h3>
        <h3>Negotiation: <span>{{ skills.negotiation }}</span></h3>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from '../../../bus.js'

export default {
  name: 'player-stats',
  data() {
    return {
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

  props: {
    skills: {}
  },

  computed: {

  },
  created() {
    //when user taps characteristic in characteristic row, take data, set it to true and set others to false;
    let self = this;

    //set all to false
    function hideAll() {
      self.brawn = false,
      self.agility = false,
      self.intellect = false,
      self.cunning = false,
      self.willpower = false,
      self.presence = false,
      self.force = false,
      self.inventory = false
    }

    bus.$on('showChar', data => {
      if (self[data]) {
        //if skills are already visible, hide them when char is clicked again
        hideAll();
        self[data] = false
      } else if (!self[data]) {
        //otherwise show them
        hideAll();
        self[data] = true
      }
    })
  },
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
