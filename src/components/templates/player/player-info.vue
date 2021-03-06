<template lang="html">
  <div>
    <div id="characterName">
      <h1>{{ player.name }}</h1><h3>{{ player.species }}</h3>
    </div>

    <div id="woundSoak">
      <div id="healthBar" class="bar"
                          :class="{danger: inDanger(player.woundCurrent, player.woundThresh)}">
        <p>{{ player.woundCurrent }} / {{ player.woundThresh }}</p>
        <div id="healthActual"></div>
      </div>
      <div id="soak">
        {{ calcSoak }}
      </div>
    </div>

    <div id="forceBar" class="bar" v-if="hasForce">
      <p>{{ player.forceCommit }} / {{ player.forceAvail}}</p>
      <div id="forceActual"></div>
    </div>

    <div id="moneyExp">
      <span>
        <h3>CREDITS: <span>{{ player.credits }}</span></h3>
      </span>
      <span>
        <h3>EXP: <span>{{ player.availableXP }}</span></h3>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player-info',

  props: {
    player: {},
    weapons: {}
  },

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
      let armorSoak = 0;

      for (let arm in armorInv) {
        if (armorInv[arm].equipped == 'true') {
          //if armor is equipped, set armorSoak to integer of the armor's soak
          armorSoak = parseInt(armorInv[arm].soak);
        }
      }

      return parseInt(this.player.soakThresh) + armorSoak;
    }
  },

  mounted() {
    this.healthWidth();
    this.forceWidth();
  },

  updated() {
    this.healthWidth();
    this.forceWidth();
  },

  methods: {
    inDanger(current, thresh) {
      let remainingPercent =  current / thresh;

      if (remainingPercent <= .25) {
        return true;
      }
    },

    healthWidth() {
      let ha = document.getElementById('healthActual');
      let hs = 100 / this.player.woundThresh;
      let th = hs * this.player.woundCurrent;
      let fh = th + '%';

      ha.style.width = fh;
    },

    forceWidth() {
      let fa = document.getElementById('forceActual');
      let ft = 100 / this.player.forceAvail;
      let fu = ft * this.player.forceCommit;
      let ff = fu + '%';

      fa.style.width = ff;
    }
  },
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
  position: relative;
  z-index: 2;
  height: 20px;
  background: darken($forceBlue, 20%);
  margin-top: 0.5rem;

  #forceActual {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: $forceBlue;
    z-index: 5;
    transition: all 250ms linear;
  }

  p {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: row;
  }
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

#moneyExp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin-top: 1rem;

  h3 {
    span {
      font-weight: 100;
    }
  }
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
