<template>
  <div class="character" >

    <div id="characterName">
      <h1>{{ players.name }}</h1><h3>{{ players.species }}</h3>
    </div>
    <div id="healthBar" class="bar">
      {{ players.woundCurrent }} / {{ players.woundThresh }}
    </div>

    <div id="forceBar" class="bar" v-if="hasForce">
      {{ players.forceCommit }} / {{ players.forceAvail}}
    </div>

    <div id="encBar" class="bar">
      {{ this.encumberance }} / {{ players.encThresh }}
    </div>

    <playerCharacteristics></playerCharacteristics>

    <div id="invButton" @click="inventory = !inventory">
      <h3>INVENTORY</h3>
    </div>

    <playerStats></playerStats>

    <div id="inv" v-if="inventory">
      <ul>
        <li v-for="shooster in this.shoosters">
          {{ shooster.name }}
          <ul>
            <li>{{ shooster.damage }}</li>
            <li>{{ shooster.crit }}</li>
            <li>{{ shooster.encumberance }}</li>
          </ul>
        </li>
      </ul>
      <ul>
        <li v-for="arm in this.armor">
          {{ arm.name }}
          <ul>
            <li>{{ arm.defense }}</li>
            <li>{{ arm.soak }}</li>
            <li>{{ arm.encumberance }}</li>
          </ul>
        </li>
      </ul>
    </div>

    <single-brief v-if="brief"></single-brief>
  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import { bus } from '../../bus.js'
import playerCharacteristics from './player/player-characteristics.vue'
import playerStats from './player/player-stats.vue'
import singleBrief from './player/single-brief.vue'

export default {
  name: 'player-view',

  data() {
    return {
      current: firebase.auth().currentUser.uid,
      inventory: false,
    }
  },

  props: {
    dashboard: false,
    brief: false,
    party: false
  },

  components: {
    playerCharacteristics,
    playerStats,
    singleBrief
  },

  firebase: function() {
    return {
      players: {
        source: db.ref('players/' + this.current),
        asObject: true
      },
      weapons: db.ref('players/' + this.current + '/inventory/weapons'),
      armorInv: db.ref('players/' + this.current + '/inventory/armor')
    }
  },

  computed: {
    currentHealth() {
      return this.players.skills.astrogation - this.players.skills.athletics
    },

    hasForce() {
      return this.players.hasForce
    },

    shoosters() {
      let arr = []

      for (let i = 0; i < this.weapons.length; i++) {
        arr.push(this.weapons[i])
      }

      return arr
    },

    armor() {
      let arr = []

      for (let i = 0; i < this.armorInv.length; i++) {
        arr.push(this.armorInv[i])
      }

      return arr
    },

    encumberance() {
      let total = 0

      for (let i = 0; i < this.weapons.length; i++) {
        if (this.weapons[i].encumberance) {
          total += parseInt(this.weapons[i].encumberance)
        }
      }

      for (let i = 0; i < this.armor.length; i++) {
        if (this.armor[i].encumberance) {
          total += parseInt(this.armor[i].encumberance)
        }
      }

      return total
    }
  },

  methods: {
    updateWeapon() {
      this.$firebaseRefs.armor.push({
        name: 'Heavy Battle Armor',
        defense: '1',
        soak: '2',
        encumberance: '6',
        hardpoints: '4',
        attachments: null
      })
    },
  },

  mounted() {
  }
}
</script>

<style lang="scss">
$healthRed: #a50000;
$forceBlue: #004ecc;
$encGreen: #0c6013;
$white: rgba(222, 222, 222, 1);
$black: rgba(99, 99, 99, 1);
$gray: rgba(155, 155, 155, 1);

.character {
  max-width: 800px;
  min-height: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

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

#invButton {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-top: 1rem;
  background: none;
  border: 1px solid rgba(99, 99, 99, 1);
  color: rgba(99, 99, 99, 1);
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  z-index: 99;
  transition: all 100ms linear;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: rgba(222, 222, 222, 1);

    &::before {
      left: 0;
      width: 100%;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0%;
    height: 100%;
    transition: all 100ms ease-out;
    background: rgba(99, 99, 99, 1);
    z-index: -1;
  }
}

#skills {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.statSection {
  margin-top: 1rem;
}

.skillSelector {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  border: 1px solid $white;
  margin: 0.5rem 0;
  cursor: pointer;

  @media (min-width: 1024px) {
    width: calc(25% - 0.5rem);
    height: 120px;
    font-size: 1.2rem;
  }

  @media (max-width: 1023px) {
    width: calc(50% - 0.5rem);
    height: 80px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    height: 65px;
    font-size: 0.8rem;
  }
}

.statsGrid {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  h2 {
    width: 100%;
    border-bottom: 1px solid $white;
    padding-bottom: 0.25rem;
    margin: 1rem 0;
  }

  h3 {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-right: 2rem;
    margin: 0.25rem 0;

    span {
      font-weight: 100;
      align-self: flex-end;
      align-content: flex-end;
    }
  }
}

#inv {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
