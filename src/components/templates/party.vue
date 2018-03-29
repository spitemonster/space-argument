<template lang="html">
  <div>
    <div class="playerCard" v-for="member in team" v-if="member.name">
      <div id="characterName">
        <h2>{{ member.name }}</h2><h4>{{ member.species }}</h4>
      </div>

      <span class="split">
        <h4>WOUND</h4>
        <h4>SOAK</h4>
      </span>

      <div id="woundSoak">
        <div id="healthBar" class="bar"
                            :class="{danger: inDanger(member.woundCurrent, member.woundThresh)}">
          <p>{{ member.woundCurrent }} / {{ member.woundThresh }}</p>
          <div id="healthActual" :style="{ width: calcWidth(member) }">
          </div>
        </div>
        <div id="soak">
          {{ calcSoak(member) }}
        </div>
      </div>

      <template v-if="member.hasForce">
        <h4>FORCE</h4>
        <div id="forceBar" class="bar">
          {{ member.forceCommit }} / {{ member.forceAvail}}
        </div>
      </template>

      <div id="charRow">
        <div v-for="(characteristic, key) in member.characteristics">
          <h4>{{ key }}</h4>
          <p>{{ characteristic.val }}</p>
        </div>
      </div>

      <div id="invRow">
        <div v-for="cat in getEquippedItem(member, 'weapons')"
             :key="cat['.key']"
             class="itemCard">
          <h4>{{ cat.name }}</h4>
          Damage: {{ cat.damage }} | Crit: {{ cat.crit }} | Skill: {{ cat.skill }} | Rank: {{ getWeaponRank(cat.skill, member) }}
        </div>
        <div v-for="arm in getEquippedItem(member, 'armor')"
             :key="arm['.key']"
             class="itemCard">
          <h4>{{ arm.name }}</h4>
          Defense: {{ arm.defense }} | Soak: {{ arm.soak }}
        </div>
      </div>

      <div v-if="isAdmin == 'Admin'" class="wound">
        <button @click="doAnHurt(member)" class="woundButton">WOUND</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'

export default {
  name: 'party',

  data() {
    return {
      // team: {},
      wound: ''
    }
  },

  computed: {
    team() {
      let tempObject = {};

      for (let member in this.party) {
        if (this.party[member].name) {
          tempObject[member] = this.party[member];
          tempObject[member].key = member;
        }
      }

      return tempObject;
    }
  },

  firebase() {
    return {
      party: {
        source: db.ref('players/'),
        asObject: true
      }
    }
  },

  watch: {
  },

  props: {
    current: '',
    isAdmin: ''
  },

  methods: {
    calcSoak(data) {
      //add up soak of equipped armor and player soak
      let armorInv = data.inventory.armor;
      let armorSoak = '';

      for (let arm in armorInv) {
        if (armorInv[arm].equipped) {
          //if armor is equipped, convert its soak value to a string and assign it to variable
          armorSoak = parseInt(armorInv[arm].soak);
        }
      }

      //add character's soak to armor's soak and return the value
      return data.soakThresh + armorSoak;
    },

    getWeaponRank(data, player) {
      //somehow gets rank in equipped weapon skill
      //vars
      let rank = '';
      let matches = '';
      let ag = player.characteristics.ag;
      let br = player.characteristics.br;
      let weaponSkills = {};

      //sort through weapon skills and split them into their own object so I can access the values
      for (let skill in ag.skills) {
        if (skill == 'rangedLight' || skill == 'rangedHeavy' || skill == 'gunnery') {
          weaponSkills[skill] = ag.skills[skill];
        }
      }

      for (let skill in br.skills) {
        if (skill == 'brawl' || skill == 'melee') {
          weaponSkills[skill] = br.skills[skill];
        }
      }

      //takes data, eg 'Ranged (Heavy)' and splits it into individual characters
      let letters = data.split('');
      //removes first letter from 'letters' and sets it to lowercase
      let first = letters.shift().toLowerCase();
      //puts lowercase first letter back at beginning of 'letters'
      letters.unshift(first);

      //loop through 'letters' array, if letter isn't a parenthese or a space, concatenate it to the 'matches' variable
      for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];

        if (letter != '(' && letter != ')' && letter != ' ') {
          matches += letter;
        }
      }
      //sorts through player argument (which should be an object), goes to skills and finally appropriate rank
      //should work for all weapons and associated skills
      return weaponSkills[matches].val;
    },

    getEquippedItem(data, category) {
      //finds equipped item, dependent on category.
      //by using arguments this function can be used for both weapons and armor

      //vars
      let equipped = [];
      //gets inventory that matches category, i.e. 'weapons' or 'armor'
      let items = data.inventory[category];

      for (let item in items) {
        //gets equipped weapon or armor and pushes it to equipped list.
        if (items[item].equipped == 'true') {
          equipped.push(items[item]);
        }
      }
      //should only return one item, but won't break if it returns multiples
      return equipped;
    },

    calcWidth(data) {
      let hs = 100 / data.woundThresh;
      let th = hs * data.woundCurrent;
      let fh = th + '%';

      return fh;
    },

    doAnHurt(data) {
      let member = data.name;
      let currentHealth = this.team[data.key].woundCurrent;
      let healthResult = currentHealth - 1;

      // console.log(this.team[data.key].woundCurrent);
      this.$firebaseRefs.party.child(data.key).child('woundCurrent').set(healthResult);
      // console.log(data.woundCurrent);
    },

    inDanger(current, thresh) {
      let remainingPercent =  current / thresh;

      if (remainingPercent <= .25) {
        return true;
      }
    },

    hasForce(data) {
      return data.hasForce;
    }
  },

  created() {
    //iterate through and remove admin and empty DB entry

  },

  mounted() {
    // console.log(this.isAdmin)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/_variables.scss';

.playerCard {
  margin-bottom: 2rem;
}

#characterName {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1rem;
}

.bar {
  color: $white;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  width: 100%;
  font-family: 'Open Mono', monospace;
}

#healthBar {
  height: 30px;
  width: calc(100% - 30px);
  background: darken($healthRed, 20%);
  position: relative;

  #healthActual {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $healthRed;
    z-index: 5;
    transition: all 250ms linear;
  }

  p {
    position: relative;
    z-index: 10;
  }
}

#forceBar {
  height: 15px;
  background: $forceBlue;
}

#encBar {
  height: 20px;
  background: $encGreen;
  margin-top: 0.5rem;
}

#charRow {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65px;
    border: 1px solid $black;
    height: 50px;
    margin-bottom: .5rem;

    h4 {
      width: 100%;
      background: $black;
      color: $white;
      text-transform: uppercase;
      font-size: .9rem;
      text-align: center;
    }

    p {
      font-size: 1.75rem;
    }
  }
}

#invRow {
  margin-top: 1rem;
}

.itemCard {
  margin-bottom: .5rem;
}

#woundSoak {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.split {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#soak {
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Mono', monospace;
  background: #FF5000;
  color: $white;
}

.woundButton {
  width: 100%;
  padding: 2rem 3rem;
}

.danger {
  animation: inDanger 2s linear infinite;
}

@keyframes inDanger {
  0% {
    box-shadow: 0px 0px 5px $healthRed;
  }

  50% {
    box-shadow: 0px 0px 20px $healthRed;
  }

  100% {
    box-shadow: 0px 0px 5px $healthRed;
  }
}
</style>
