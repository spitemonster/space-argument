<template lang="html">
  <div>
    <div id="characterName">
      <h1>{{ player.name }}</h1><h3>{{ player.species }}</h3>
    </div>

    <div id="woundSoak">
      <div id="healthBar" class="bar">
        <p>{{ player.woundCurrent }} / {{ player.woundThresh }}</p>
        <div id="healthActual"></div>
      </div>
      <div id="soak">
        {{ calcSoak }}
      </div>
    </div>

    <div id="forceBar" class="bar" v-if="hasForce">
      {{ player.forceCommit }} / {{ player.forceAvail}}
    </div>

    <!-- <div id="encBar" class="bar">
      {{ encumberance }} / {{ player.encThresh }}
    </div> -->
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
    },

    calcSoak() {
      //calculates player's soak based on base soak and armor soak
      let armorInv = this.player.inventory.armor;
      let armorSoak = '';

      for (let arm in armorInv) {
        if (armorInv[arm].equipped) {
          //if armor is equipped, set armorSoak to integer of the armor's soak
          armorSoak = parseInt(armorInv[arm].soak);
        }
      }

      return this.player.soakThresh + armorSoak;
    }
  },

  props: {
    player: {},
    weapons: {}
  },

  methods: {
    currentHealth() {
      return this.player.skills.astrogation - this.player.skills.athletics
    }
  },

  updated() {
    let ha = document.getElementById('healthActual');
    let hs = 100 / this.player.woundThresh;
    let th = hs * this.player.woundCurrent;
    let fh = th + '%';

    ha.style.width = fh;
  },

  mounted() {
    let ha = document.getElementById('healthActual');
    let hs = 100 / this.player.woundThresh;
    let th = hs * this.player.woundCurrent;
    let fh = th + '%';

    ha.style.width = fh;
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
  color: $white;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  font-family: 'Open Mono', monospace;
}

#healthBar {
  position: relative;
  z-index: 2;
  height: 40px;
  background: darken($healthRed, 20%);
  width: calc(100% - 50px);
  
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
  height: 20px;
  background: $forceBlue;
  margin-top: 0.5rem;
}

#encBar {
  height: 20px;
  background: $encGreen;
  margin-top: 0.5rem;
}

#woundSoak {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

#soak {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Mono', monospace;
  background: #FF5000;
  color: $white;
  width: 50px;
}
</style>
