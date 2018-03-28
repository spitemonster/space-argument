<template>
  <div id="stats">
    <div class="statSection" v-if="brawn">
      <div class="statsGrid">
        <h3 :class="{spec: skills.athletics.spec}">Athletics: <span>{{ skills.athletics.value }}<span class="rankUp" @click="rankUp(athletics)">+</span></span></h3>
        <h3 :class="{spec: skills.resilience.spec}">Resilience: <span>{{ skills.resilience.value }}<span class="rankUp" @click="rankUp(resilience)">+</span></span></h3>
        <h3 :class="{spec: skills.brawl.spec}">Brawl: <span>{{ skills.brawl.value }}<span class="rankUp" @click="rankUp(brawl)">+</span></span></h3>
        <h3 :class="{spec: skills.melee.spec}">Melee: <span>{{ skills.melee.value }}<span class="rankUp" @click="rankUp(melee)">+</span></span></h3>
      </div>
    </div>
    <div class="statSection" v-if="agility">
      <div class="statsGrid">
        <h3 :class="{spec: skills.coordination.spec}">Coordination: <span>{{ skills.coordination.value }}<span class="rankUp" @click="rankUp(coordination)">+</span></span></h3>
        <h3 :class="{spec: skills.pilotingPlanetary.spec}">Piloting (Planetary): <span>{{ skills.pilotingPlanetary.value }}<span class="rankUp" @click="rankUp(pilotingPlanetary)">+</span></span></h3>
        <h3 :class="{spec: skills.pilotingSpace.spec}">Piloting (Space): <span>{{ skills.pilotingSpace.value }}<span class="rankUp" @click="rankUp(pilotingSpace)">+</span></span></h3>
        <h3 :class="{spec: skills.stealth.spec}">Stealth: <span>{{ skills.stealth.value }}<span class="rankUp" @click="rankUp(stealth)">+</span></span></h3>
        <h3 :class="{spec: skills.rangedLight.spec}">Ranged (Light): <span>{{ skills.rangedLight.value }}<span class="rankUp" @click="rankUp(rangedLight)">+</span></span></h3>
        <h3 :class="{spec: skills.rangedHeavy.spec}">Ranged (Heavy): <span>{{ skills.rangedHeavy.value }}</span></h3>
        <h3 :class="{spec: skills.gunnery.spec}">Gunnery: <span>{{ skills.gunnery.value }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="intellect">
      <div class="statsGrid">
        <h3 :class="{spec: skills.astrogation.spec}">Astrogation: <span>{{ skills.astrogation.value }}</span></h3>
        <h3 :class="{spec: skills.computers.spec}">Computers: <span>{{ skills.computers.value }}</span></h3>
        <h3 :class="{spec: skills.mechanics.spec}">Mechanics: <span>{{ skills.mechanics.value }}</span></h3>
        <h3 :class="{spec: skills.medicine.spec}">Medicine: <span>{{ skills.medicine.value }}</span></h3>

        <h2>Knowledge</h2>

        <h3 :class="{spec: skills.coreWorlds.spec}">Core Worlds <span>{{ skills.coreWorlds.value }}</span></h3>
        <h3 :class="{spec: skills.education.spec}">Education: <span>{{ skills.education.value }}</span></h3>
        <h3 :class="{spec: skills.lore.spec}">Lore: <span>{{ skills.lore.value }}</span></h3>
        <h3 :class="{spec: skills.outerRim.spec}">Outer Rim: <span>{{ skills.outerRim.value }}</span></h3>
        <h3 :class="{spec: skills.underworld.spec}">Underworld: <span>{{ skills.underworld.value }}</span></h3>
        <h3 :class="{spec: skills.warfare.spec}">Warfare: <span>{{ skills.warfare.value }}</span></h3>
        <h3 :class="{spec: skills.xenology.spec}">Xenology: <span>{{ skills.xenology.value }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="cunning">
      <div class="statsGrid">
        <h3 :class="{spec: skills.deception.spec}">Deception: <span>{{ skills.deception.value }}</span></h3>
        <h3 :class="{spec: skills.perception.spec}">Perception: <span>{{ skills.perception.value }}</span></h3>
        <h3 :class="{spec: skills.skulduggery.spec}">Skulduggery: <span>{{ skills.skulduggery.value }}</span></h3>
        <h3 :class="{spec: skills.streetwise.spec}">Streetwise: <span>{{ skills.streetwise.value }}</span></h3>
        <h3 :class="{spec: skills.survival.spec}">Survival: <span>{{ skills.survival.value }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="willpower">
      <div class="statsGrid">
        <h3 :class="{spec: skills.coercion.spec}">Coercion: <span>{{ skills.coercion.value }}</span></h3>
        <h3 :class="{spec: skills.discipline.spec}">Discipline: <span>{{ skills.discipline.value }}</span></h3>
        <h3 :class="{spec: skills.skulduggery.spec}">Vigilance: <span>{{ skills.skulduggery.value }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="presence">
      <div class="statsGrid">
        <h3 :class="{spec: skills.charm.spec}">Charm: <span>{{ skills.charm.value }}</span></h3>
        <h3 :class="{spec: skills.cool.spec}">Cool: <span>{{ skills.cool.value }}</span></h3>
        <h3 :class="{spec: skills.leadership.spec}">Leadership: <span>{{ skills.leadership.value }}</span></h3>
        <h3 :class="{spec: skills.negotiation.spec}">Negotiation: <span>{{ skills.negotiation.value }}</span></h3>
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
  methods: {
    rankUp() {
      console.log('test');
    }
  }
}
</script>

<style lang="scss" scoped>
#stats {
  color: rgb(99, 99, 99);
  font-weight: 100;
  text-transform: uppercase;
}

#stats h3 {
  font-weight: 100;
}

.spec {
  font-weight: bold !important;
}
</style>
