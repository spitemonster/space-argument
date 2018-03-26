<template lang="html">
  <div>
    <div class="playerCard" v-for="member in party" v-if="member.name">
      <div id="characterName">
        <h2>{{ member.name }}</h2><h4>{{ member.species }}</h4>
      </div>

      <h4>WOUND</h4>
      <div id="healthBar" class="bar">
        {{ member.woundCurrent }} / {{ member.woundThresh }}
      </div>

      <template v-if="member.hasForce">
        <h4>FORCE</h4>
        <div id="forceBar" class="bar">
          {{ member.forceCommit }} / {{ member.forceAvail}}
        </div>
      </template>

      <div id="charRow">
        <div v-for="(characteristic, characteristicID) in member.characteristics">
          <h4>{{ characteristicID }}</h4>
          <p>{{ characteristic }}</p>
        </div>
      </div>

      <div id="invRow">
        <div v-for="cat in member.inventory.weapons" v-if="cat.equipped == 'true'" class="itemCard">
          <h4>{{ cat.name }}</h4>
          Damage: {{ cat.damage }} | Crit: {{ cat.crit }} | Skill: {{ cat.skill }}
        </div>
        <div v-for="arm in member.inventory.armor" v-if="arm.equipped == 'true'" class="itemCard">
          <h4>{{ arm.name }}</h4>
          Defense: {{ arm.defense }} | Soak: {{ arm.soak }}
        </div>
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
      team: {}
    }
  },

  computed: {

  },

  firebase() {
    return {
      party: db.ref('players/')
    }
  },

  watch: {

  },

  props: {
    // party: {},
    current: ''
  },

  methods: {
  },

  created() {
    //iterate through and remove admin and empty DB entry, as well as
    for (let i = 0; i < this.party.length; i++) {
      if (this.party[i].name && this.party[i]['.key'] != this.current) {
        this.team[this.party[i].name] = this.party[i];
      }
    }
  },

  mounted() {
    // console.log(this.party);
  }
}
</script>

<style lang="scss">
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
  // border-radius: 2px;
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
  background: $healthRed;
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

.itemCard {
  margin-bottom: 1rem;
}
</style>
