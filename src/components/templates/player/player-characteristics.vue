<template>
  <div id="characteristics">
    <div class="charCard" @click="showThis">
      <h4>brawn</h4>
      <div class="charRank">
        {{ players.brawn }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>agility</h4>
      <div class="charRank">
        {{ players.agility }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>intellect</h4>
      <div class="charRank">
        {{ players.intellect }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>cunning</h4>
      <div class="charRank">
        {{ players.cunning }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>willpower</h4>
      <div class="charRank">
        {{ players.willpower }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
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
</template>

<script>
import db from '../../../assets/js/firebaseConfig.js'
import { bus } from '../../../bus.js'

export default {
  name: 'player-characteristics',

  data () {
    return {
      current: firebase.auth().currentUser.uid,
      brawn: false,
      agility: false,
      int: false,
      cun: false,
      willpower: false,
      pres: false
    }
  },

  firebase: function() {
    return {
      players: {
        source: db.ref('players/' + this.current),
        asObject: true
      },
      weapons: db.ref('players/' + this.current + '/inventory/weapons'),
      armorInv: db.ref('players/' + this.current + '/inventory/armor'),
    }
  },

  computed: {
    hasForce() {
      return this.players.hasForce;
    }
  },

  methods: {
    showThis(e) {
      if (e.target.tagName == 'H4') {
        bus.$emit('showChar', e.target.innerHTML);
      } else if (e.target.parentNode.childNodes[0].tagName == 'H4') {
        bus.$emit('showChar', e.target.parentNode.childNodes[0].innerHTML);
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/css/_variables.scss';

#characteristics {
  color: $white;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  .charCard {
    background: $gray;
    height: 100px;
    text-align: center;
    // border: 1px solid $white;
    cursor: pointer;

    @media (min-width: 1024px) {
      width: 14%;
      min-width: 100px;
    }

    @media (max-width: 1023px) {
      width: 14%;
      min-width: 80px;
    }

    @media (min-width: 520px) {
      margin-top: 1rem;
    }

    @media (max-width: 519px) {
      margin-top: 1rem;
    }

    h4 {
      text-transform: uppercase;
      background: $black;
      width: 100%;
      height: 20px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-line-pack: center;
      align-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      @media (min-width: 1024px) {
        font-size: 0.9rem;
      }

      @media (max-width: 1023px) {
        font-size: 0.8rem;
      }
    }
  }

  .charRank {
    height: 80px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 64px;
  }
}
</style>
