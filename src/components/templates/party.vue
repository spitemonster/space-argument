<template lang="html">
  <div>
    <div class="playerCard" v-for="member in this.team">
      <div id="characterName">
        <h2>{{ member.name }}</h2><h4>{{ member.species }}</h4>
      </div>
      <div id="healthBar" class="bar">
        {{ member.woundCurrent }} / {{ member.woundThresh }}
      </div>

      <div id="forceBar" class="bar" v-if="member.hasForce">
        {{ member.forceCommit }} / {{ member.forceAvail}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'party',

  data() {
    return {
      //cleaned up array of players and stats from the party object
      team: []
    }
  },

  props: {
    party: {},
    current: ''
  },

  methods: {
  },

  mounted() {
    //set up party array, filters out current user, admin and superfluous crap from firebase
    for (var member in this.party) {
      if (this.party[member].name && member != this.current) {
        this.team.push(this.party[member]);
      }
    }
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
  margin-top: 0.5rem;
}

#encBar {
  height: 20px;
  background: $encGreen;
  margin-top: 0.5rem;
}
</style>
