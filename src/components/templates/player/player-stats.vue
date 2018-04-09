<template>
  <div id="stats">
    <div v-if="skillError" id="skillError">
      <p>You don't have enough experience points</p>
    </div>
    <div class="statSection" v-if="brawn">
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
    <div class="statSection" v-if="knowledge">
      <div class="statsGrid">
        <h2>Knowledge</h2>
        <h3 v-for="(k, key) in know">{{ key }} <span>{{ k.val }}<span class="rankUp" @click="rankUpKnow(key)">+</span></span></h3>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from '../../../bus.js'

export default {
  name: 'player-stats',

  props: {
    characteristics: {},
    refs: {},
    exp: null,
    know: {}
  },

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
      skillError: false,
      showAll: false,
      knowledge: false
    }
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
      } else if (self[data] && self.showAll) {
        hideAll();
        console.log('test');
        self[data] = true;
      }
    });

    bus.$on('skillError', () => {
      this.skillError = true;
      console.log(this.skillError);
      setTimeout(() => {
        this.skillError = false;
      }, 3000)
    });

    //listens for show all on the bus and shows all characteristic skill areas together, kind of clunky
    bus.$on('showAll', () => {
      if (!self.showAll) {
        self.brawn = true,
        self.agility = true,
        self.intellect = true,
        self.cunning = true,
        self.willpower = true,
        self.presence = true,
        self.force = true,
        self.showAll = true
      } else if (self.showAll) {
        self.brawn = false,
        self.agility = false,
        self.intellect = false,
        self.cunning = false,
        self.willpower = false,
        self.presence = false,
        self.force = false,
        self.showAll = false
      }
    });

    bus.$on('showKnowledge', () => {
      this.knowledge = !this.knowledge;
    })
  },

  methods: {
    //calculates cost to rank up a skill, dependent on the current rank and whether or not the skill is specialized, and either ranks it up, or errors if the user doesn't have enough XP to afford the rank up
    rankUp(skill, char) {
      let exp = this.exp;
      let skillName = this.characteristics[char].skills[skill];
      let currentRank = skillName.val;
      let oneUp = currentRank + 1;
      let isSpec = skillName.spec;
      let cost = null;
      let remaining = null;

      //if skill is specialized, cost is 5 * whatever the rank you're buying is. if not specialized, cost is 5 * rank + 5.
      if (isSpec) {
        cost = 5 * oneUp;
      } else if (!isSpec) {
        cost = 5 * oneUp + 5;
      }

      //if user has enough XP, up the rank on the skill, otherwise throw an error and display it with the bus
      if (exp - cost >= 0) {
        remaining = exp - cost;
        this.refs.child('characteristics').child(char).child('skills').child(skill).set({val: oneUp, spec: isSpec});
        this.refs.child('availableXP').set(remaining);
      } else {
        bus.$emit('skillError');
      }
    },

    //i don't remember why i did this. maybe because knowledge is different? i don't know. i'll go over otherwise
    rankUpKnow(skill) {
      let exp = this.exp;
      let skillName = this.know[skill];
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
        this.refs.child('knowledge').child(skill).set({val: oneUp, spec: false});
      } else {
        bus.$emit('skillError');
      }
    },

    getName(data) {
      //very clumsily sets skill name to a punctuated, spaced version to make for prettier display
      //split camelCased skill into letters
      let letters = data.split('');
      //declare index variable to be used later
      let index = null;
      //remove first letter to make for capitalizing
      let first = letters.shift();
      //declare empty skill variable
      let skill = '';

      //sorts through the array of letters, when it finds the uppercase letter, sets that as the index
      for (let i = 0; i < letters.length; i++) {
        if (letters[i] === letters[i].toUpperCase()) {
          index = i;
        }
      }

      //add first letter back after capitalizing it
      letters.unshift(first.toUpperCase());

      //basically, if the array had a capitalized word, add a space before it and wrap the capitalized word in parentheses.
      // explanation: if the word was camelCased, it means it was a two word title, which broadly meant it was a qualifier such as 'Ranged (Heavy)'. if the word wasn't camelCased, it probably meant it was a single word, and if so (based on the index), this whole part will be skipped
      if (index > 0) {
        letters.splice(index + 1, 0, ' (');
        letters.push(')');
      }

      //reconcatenate the word from the array after the modifications
      for (let i = 0; i < letters.length; i++) {
        skill += letters[i];
      }

      //return the word
      return skill;
    }
  },
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
  margin-top: 1rem;
  margin-bottom: 1rem;
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
