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
      <div class="charCard">
        <h4>brawn</h4>
        <div class="charRank">
          {{ players.brawn }}
        </div>
      </div>

      <div class="charCard">
        <h4>agility</h4>
        <div class="charRank">
          {{ players.agility }}
        </div>
      </div>

      <div class="charCard">
        <h4>intellect</h4>
        <div class="charRank">
          {{ players.intellect }}
        </div>
      </div>

      <div class="charCard">
        <h4>cunning</h4>
        <div class="charRank">
          {{ players.cunning }}
        </div>
      </div>

      <div class="charCard">
        <h4>willpower</h4>
        <div class="charRank">
          {{ players.willpower }}
        </div>
      </div>

      <div class="charCard">
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

    <div id="skills">
      <div class="skillSelector" @click="showBattle">
        BATTLE
      </div>
      <div class="skillSelector" @click="showTech">
        TECH
      </div>
      <div class="skillSelector" @click="showKnow">
        KNOWLEDGE
      </div>
      <div class="skillSelector" @click="showInv">
        INVENTORY
      </div>
    </div>

    <div class="statSection" v-if="battle">
      <h3>Athletics: <span>{{ players.skills.athletics }}</span></h3>
      <h3>Cool: <span>{{ players.skills.cool }}</span></h3>
      <h3>Coordination: <span>{{ players.skills.coordination }}</span></h3>
    </div>
    <div class="statSection"v-if="tech">
      <p>TECH</p>
    </div>
    <div class="statSection" v-if="know">
      <div class="statsGrid">
        <h3>Core Worlds <span : <span>{{ players.skills.coreWorlds }}</span></h3>
        <h3>Education: <span>{{ players.skills.education }}</span></h3>
        <h3>Lore: <span>{{ players.skills.lore }}</span></h3>
        <h3>Outer Rim: <span>{{ players.skills.outerRim }}</span></h3>
        <h3>Underworld: <span>{{ players.skills.underworld }}</span></h3>
        <h3>Warfare: <span>{{ players.skills.warfare }}</span></h3>
        <h3>Xenology: <span>{{ players.skills.xenology }}</span></h3>
      </div>
    </div>
    <div class="statSection" v-if="inv">
      <p>{{ invWeapons }}</p>
    </div>
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
      battle: false,
      tech: false,
      know: false,
      inv: false
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
    showBattle() {
      if (this.battle) {
        this.battle = false;
      } else if (!this.battle) {
        this.battle = true;
      }
      this.tech = false;
      this.know = false;
      this.inv = false;
    },
    showTech() {
      if (this.tech) {
        this.tech = false;
      } else if (!this.tech) {
        this.tech = true;
      }
      this.battle = false;
      this.know = false;
      this.inv = false;
    },
    showKnow() {
      if (this.know) {
        this.know = false;
      } else if (!this.know) {
        this.know = true;
      }
      this.tech = false;
      this.battle = false;
      this.inv = false;
    },
    showInv() {
      if (this.inv) {
        this.inv = false;
      } else if (!this.inv) {
        this.inv = true;
      }
      this.tech = false;
      this.know = false;
      this.battle = false;

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
        width: 100px;
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

    h3 {
      display: flex;
      justify-content: space-between;
      width: 50%;
      padding-right: 2rem;
    }

    span {
      font-weight: 100;
      align-self: flex-end;
    }
  }
</style>
