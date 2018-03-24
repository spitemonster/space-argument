<template lang="html">
  <div>
    <div id="characterName">
      <h1>{{ player.name }}</h1><h3>{{ player.species }}</h3>
    </div>
    <div id="healthBar" class="bar">
      {{ player.woundCurrent }} / {{ player.woundThresh }}
    </div>

    <div id="forceBar" class="bar" v-if="hasForce">
      {{ player.forceCommit }} / {{ player.forceAvail}}
    </div>

    <div id="encBar" class="bar">
      {{ encumberance }} / {{ player.encThresh }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'player-info',

  data() {
    return {

    }
  },

  computed: {
    encumberance() {
      let total = 0

      return total;
    },

    hasForce() {
      return this.player.hasForce;
    }
  },

  props: {
    player: {},
    weapons: {},
    armor: {}
  },

  methods: {
    currentHealth() {
      return this.player.skills.astrogation - this.player.skills.athletics
    }
  },

  mounted() {
  }
}
</script>

<style lang="scss">
@import '../../../assets/css/_variables.scss';
#characterName {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 2rem;
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
  height: 40px;
  background: $healthRed;
}

#forceBar {
  height: 20px;
  background: $forceBlue;
  margin-top: 0.5rem;
}

#encBar {
  height: 20px;
  background: $encGreen;
  margin-top: 0.5rem;
}
</style>
