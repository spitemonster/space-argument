<template>
  <div id="stats">
    <div class="statSection" v-if="brawn">
      <div v-if="skillError" id="skillError">
        <p>You don't have enough experience points</p>
      </div>
      <div class="statsGrid">
        <h3 v-for="(skill, key) in characteristics.br.skills"
            :class="{spec: skill.spec}">{{ getName(key) }} <span>{{ skill.val }}<span class="rankUp" @click="rankUp(key, 'br')">+</span></span></h3>
      </div>
    </div>
    <div class="statSection" v-if="agility">
      <div class="statsGrid">
        <h3 v-for="(skill, key) in characteristics.ag.skills"
            :class="{spec: skill.spec}">{{ getName(key) }} <span>{{ skill.val }}<span class="rankUp" @click="rankUp(key, 'ag')">+</span></span></h3>
      </div>
    </div>
    <div class="statSection" v-if="intellect">
      <div class="statsGrid">
        <div class="statsGrid">
          <h3 v-for="(skill, key) in characteristics.int.skills"
              :class="{spec: skill.spec}">{{ key }} <span>{{ skill.val }}<span class="rankUp" @click="rankUp(key, 'int')">+</span></span></h3>
        </div>

        <h2>Knowledge</h2>

        <!-- <h3 :class="{spec: skills.coreWorlds.spec}">Core Worlds <span>{{ skills.coreWorlds.value }}</span></h3>
        <h3 :class="{spec: skills.education.spec}">Education: <span>{{ skills.education.value }}</span></h3>
        <h3 :class="{spec: skills.lore.spec}">Lore: <span>{{ skills.lore.value }}</span></h3>
        <h3 :class="{spec: skills.outerRim.spec}">Outer Rim: <span>{{ skills.outerRim.value }}</span></h3>
        <h3 :class="{spec: skills.underworld.spec}">Underworld: <span>{{ skills.underworld.value }}</span></h3>
        <h3 :class="{spec: skills.warfare.spec}">Warfare: <span>{{ skills.warfare.value }}</span></h3>
        <h3 :class="{spec: skills.xenology.spec}">Xenology: <span>{{ skills.xenology.value }}</span></h3> -->
      </div>
    </div>
    <div class="statSection" v-if="cunning">
      <div class="statsGrid">
        <div class="statsGrid">
          <h3 v-for="(skill, key) in characteristics.cun.skills"
              :class="{spec: skill.spec}">{{ key }} <span>{{ skill.val }}<span class="rankUp" @click="rankUp(key, 'cun')">+</span></span></h3>
        </div>
      </div>
    </div>
    <div class="statSection" v-if="willpower">
      <div class="statsGrid">
        <div class="statsGrid">
          <h3 v-for="(skill, key) in characteristics.will.skills"
              :class="{spec: skill.spec}">{{ key }} <span>{{ skill.val }}<span class="rankUp" @click="rankUp(key, 'will')">+</span></span></h3>
        </div>
      </div>
    </div>
    <div class="statSection" v-if="presence">
      <div class="statsGrid">
        <div class="statsGrid">
          <h3 v-for="(skill, key) in characteristics.pres.skills"
              :class="{spec: skill.spec}">{{ key }} <span>{{ skill.val }}<span class="rankUp" @click="rankUp(key, 'pres')">+</span></span></h3>
        </div>
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
      inventory: false,
      skillError: false
    }
  },

  props: {
    characteristics: {},
    refs: {},
    exp: null
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
    });

    bus.$on('skillError', () => {
      this.skillError = true;

      setTimeout(() => {
        this.skillError = false;
      }, 3000)
    });
  },

  methods: {
    rankUp(skill, char) {
      let exp = this.exp;
      let skillName = this.characteristics[char].skills[skill];
      let currentRank = skillName.val;
      let oneUp = currentRank + 1;
      let isSpec = skillName.spec;
      let cost = null;

      if (isSpec) {
        cost = 5 * oneUp;
      } else if (!isSpec) {
        cost = 5 * oneUp + 5;
      }

      if (exp - cost >= 0) {
        this.refs.child('characteristics').child(char).child('skills').child(skill).set({val: 0, spec: false});
      } else {
        bus.$emit('skillError');
      }
    },

    getName(data) {
      //very clumsily sets skill name to a punctuated, spaced version to make for prettier display
      let letters = data.split('');
      let index = null;
      let first = letters.shift();
      let skill = '';

      for (let i = 0; i < letters.length; i++) {
        if (letters[i] === letters[i].toUpperCase()) {
          index = i;
        }
      }

      letters.unshift(first.toUpperCase());

      if (index > 0) {
        letters.splice(index + 1, 0, ' (');
        letters.push(')');
      }

      for (let i = 0; i < letters.length; i++) {
        skill += letters[i];
      }

      return skill;
    }
  },

  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/_variables.scss';

.statsGrid {
  h3 {
    padding-right: 0 !important;
  }
}
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

#skillError {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border: 1px solid $healthRed;
  color: $healthRed;
  padding: 2rem;
}

.rankUp {
  color: $black;
  font-weight: bold;
  margin-left: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 100ms linear;

  &:hover {
    color: $gray;
  }
}
</style>
