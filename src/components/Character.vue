<template>
  <div class="character">
    <div id="characterName">
      <h1>{{ players.name }}</h1><h3>{{ players.species }}</h3>
    </div>
    <div id="healthBar" class="bar">
      {{ players.woundCurrent }} / {{ players.woundThresh }}
    </div>
    <div id="forceBar" class="bar" v-if="hasForce">
      {{ players.forceCommit }} / {{ players.forceAvail}}
    </div>

    <div id="characteristics">
      <div class="charCard" @click="showBrawn">
        <h4>brawn</h4>
        <div class="charRank">
          {{ players.brawn }}
        </div>
      </div>

      <div class="charCard" @click="showAgility">
        <h4>agility</h4>
        <div class="charRank">
          {{ players.agility }}
        </div>
      </div>

      <div class="charCard" @click="showInt">
        <h4>intellect</h4>
        <div class="charRank">
          {{ players.intellect }}
        </div>
      </div>

      <div class="charCard" @click="showCun">
        <h4>cunning</h4>
        <div class="charRank">
          {{ players.cunning }}
        </div>
      </div>

      <div class="charCard" @click="showWill">
        <h4>willpower</h4>
        <div class="charRank">
          {{ players.willpower }}
        </div>
      </div>

      <div class="charCard" @click="showPres">
        <h4>presence</h4>
        <div class="charRank">
          {{ players.presence }}
        </div>
      </div>

      <div v-if="hasForce" class="charCard">
        <h4>force</h4>
        <div class="charRank">
          {{ players.forceRank }}
        </div>
      </div>
    </div>

    <div class="statSection" v-if="brawn">
      <div class="statsGrid">
        <h3>Athletics: <span>{{ players.skills.athletics }}</span></h3>
        <h3>Resilience: <span>{{ players.skills.resilience }}</span></h3>
        <h3>Brawl: <span>{{ players.skills.brawl }}</span></h3>
        <h3>Melee: <span>{{ players.skills.melee }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="agility">
      <div class="statsGrid">
        <h3>Coordination: <span>{{ players.skills.coordination }}</span></h3>
        <h3>Piloting (Planetary): <span>{{ players.skills.pilotingPlanetary }}</span></h3>
        <h3>Piloting (Space): <span>{{ players.skills.pilotingSpace }}</span></h3>
        <h3>Stealth: <span>{{ players.skills.stealth }}</span></h3>
        <h3>Ranged (Light): <span>{{ players.skills.rangedLight }}</span></h3>
        <h3>Ranged (Heavy): <span>{{ players.skills.rangedHeavy }}</span></h3>
        <h3>Gunnery: <span>{{ players.skills.gunnery }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="int">
      <div class="statsGrid">
        <h3>Astrogation: <span>{{ players.skills.astrogation }}</span></h3>
        <h3>Computers: <span>{{ players.skills.computers }}</span></h3>
        <h3>Mechanics: <span>{{ players.skills.mechanics }}</span></h3>
        <h3>Medicine: <span>{{ players.skills.medicine }}</span></h3>

        <h2>Knowledge</h2>

        <h3>Core Worlds <span>{{ players.skills.coreWorlds }}</span></h3>
        <h3>Education: <span>{{ players.skills.education }}</span></h3>
        <h3>Lore: <span>{{ players.skills.lore }}</span></h3>
        <h3>Outer Rim: <span>{{ players.skills.outerRim }}</span></h3>
        <h3>Underworld: <span>{{ players.skills.underworld }}</span></h3>
        <h3>Warfare: <span>{{ players.skills.warfare }}</span></h3>
        <h3>Xenology: <span>{{ players.skills.xenology }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="cun">
      <div class="statsGrid">
        <h3>Deception: <span>{{ players.skills.deception }}</span></h3>
        <h3>Perception: <span>{{ players.skills.perception }}</span></h3>
        <h3>Skulduggery: <span>{{ players.skills.skulduggery }}</span></h3>
        <h3>Streetwise: <span>{{ players.skills.streetwise }}</span></h3>
        <h3>Survival: <span>{{ players.skills.survival }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="will">
      <div class="statsGrid">
        <h3>Coercion: <span>{{ players.skills.coercion }}</span></h3>
        <h3>Discipline: <span>{{ players.skills.discipline }}</span></h3>
        <h3>Vigilance: <span>{{ players.skills.skulduggery }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="pres">
      <div class="statsGrid">
        <h3>Charm: <span>{{ players.skills.charm }}</span></h3>
        <h3>Cool: <span>{{ players.skills.cool }}</span></h3>
        <h3>Leadership: <span>{{ players.skills.leadership }}</span></h3>
        <h3>Negotiation: <span>{{ players.skills.negotiation }}</span></h3>
      </div>
    </div>
    <!-- <div class="statSection" v-if="inv">
      <p>{{ invWeapons }}</p>
    </div> -->
  </div>
</template>

<script>
import db from '../assets/js/firebaseConfig.js'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import Char from './templates/characteristics.vue'

export default {
  name: 'Character',
  components: {
    Char,
  },
  data () {
    return {
      current: firebase.auth().currentUser.uid,
      brawn: false,
      agility: false,
      int: false,
      cun: false,
      will: false,
      pres: false,
      force: false
    }
  },
  firebase: function() {
    return {
      players: {
        source: db.ref('players/' + this.current),
        asObject: true
      },
      weapons: {
        source: db.ref('players/' + this.current + '/inventory/weapons'),
        asObject: true
      }
    }
  },
  computed: {
    currentHealth() {
      return this.players.skills.astrogation - this.players.skills.athletics;
    },
    hasForce() {
      return this.players.hasForce;
    }
  },
  methods: {
    showBrawn() {
      if (this.brawn) {
        this.brawn = false;
      } else if (!this.brawn) {
        this.brawn = true;
      }
      this.agility = false;
      this.int = false;
      this.cun = false;
      this.will = false;
      this.pres = false;

    },
    showAgility() {
      if (this.agility) {
        this.agility = false;
      } else if (!this.agility) {
        this.agility = true;
      }
      this.brawn = false;
      this.int = false;
      this.cun = false;
      this.will = false;
      this.pres = false;

    },
    showInt() {
      if (this.int) {
        this.int = false;
      } else if (!this.int) {
        this.int = true;
      }
      this.agility = false;
      this.brawn = false;
      this.cun = false;
      this.will = false;
      this.pres = false;

    },
    showCun() {
      if (this.cun) {
        this.cun = false;
      } else if (!this.cun) {
        this.cun = true;
      }
      this.agility = false;
      this.int = false;
      this.brawn = false;
      this.will = false;
      this.pres = false;

    },
    showWill() {
      if (this.will) {
        this.will = false;
      } else if (!this.will) {
        this.will = true;
      }
      this.agility = false;
      this.int = false;
      this.brawn = false;
      this.cun = false;
      this.pres = false;

    },
    showPres() {
      if (this.pres) {
        this.pres = false;
      } else if (!this.pres) {
        this.pres = true;
      }
      this.agility = false;
      this.int = false;
      this.brawn = false;
      this.cun = false;
      this.will = false;

    },
  }
}
</script>

<style lang="scss">
  $healthRed: #a50000;
  $forceBlue: #004ecc;
  $white: rgba(222,222,222,1);
  $black: rgba(22,22,22,1);
  $gray: rgba(89,89,89,1);

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
    border-radius: 2px;
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
    margin-top: .5rem;
  }

  #characteristics {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .charCard {
      background: $gray;
      height: 100px;
      text-align: center;
      border: 1px solid $white;

      @media (min-width: 1024px) {
        width: 14%;
        min-width: 100px;
      }

      @media (max-width: 1023px) {
        width: 14%;
        min-width: 80px;
      }

      @media (min-width: 520px) {
        margin: 1rem 0 0;
      }

      @media (max-width: 519px) {
        margin: 1rem auto 0;
      }

      h4 {
        text-transform: uppercase;
        background: $black;
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;

        @media (min-width: 1024px) {
          font-size: .9rem;
        }

        @media (max-width: 1023px) {
          font-size: .8rem;
        }
      }
    }

    .charRank {
      height: 80px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      font-size: 64px;
    }
  }

  #skills {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: .5rem;
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
    margin: .5rem 0;
    cursor: pointer;

    @media (min-width: 1024px) {
      width: calc(25% - .5rem);
      height: 120px;
      font-size: 1.2rem;
    }

    @media (max-width: 1023px) {
      width: calc(50% - .5rem);
      height: 80px;
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      height: 65px;
      font-size: .8rem;
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
      padding-bottom: .25rem;
      margin: 1rem 0;
    }

    h3 {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-right: 2rem;
      margin: .25rem 0;

      span {
        font-weight: 100;
        align-self: flex-end;
        align-content: flex-end;
      }
    }
  }
</style>
