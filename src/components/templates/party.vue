<template lang="html">
  <div>
    <div class="playerCard" v-for="member in team">
      <div id="characterName">
        <h2>{{ member.name }}</h2><h4>{{ member.species }}</h4>
      </div>

      <div id="healthBar" class="bar">
        {{ member.woundCurrent }} / {{ member.woundThresh }}
      </div>

      <div id="forceBar" class="bar" v-if="member.hasForce">
        {{ member.forceCommit }} / {{ member.forceAvail}}
      </div>

      <div id="charRow">
        <div v-for="(characteristic, characteristicID) in member.characteristics">
          <h4>{{ characteristicID }}</h4>
          <p>{{ characteristic }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'party',

  data() {
    return {
      team: {}
    }
  },

  computed: {

  },

  watch: {

  },

  props: {
    party: {},
    current: ''
  },

  methods: {
  },

  created() {
    for (let i = 0; i < this.party.length; i++) {
      if (this.party[i].name && this.party[i]['.key'] != this.current) {
        this.team[this.party[i].name] = this.party[i];
        // console.log(this.party[i]['.key']);
      }
    }
  },

  mounted() {
    // console.log(this.team);
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
</style>
