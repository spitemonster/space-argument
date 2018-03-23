<template>
  <div id="characteristics">
    <div class="charCard" @click="showThis">
      <h4>brawn</h4>
      <div class="charRank">
        {{ characteristics.brawn }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>agility</h4>
      <div class="charRank">
        {{ characteristics.agility }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>intellect</h4>
      <div class="charRank">
        {{ characteristics.intellect }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>cunning</h4>
      <div class="charRank">
        {{ characteristics.cunning }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>willpower</h4>
      <div class="charRank">
        {{ characteristics.willpower }}
      </div>
    </div>

    <div class="charCard" @click="showThis">
      <h4>presence</h4>
      <div class="charRank">
        {{ characteristics.presence }}
      </div>
    </div>

    <div v-if="hasForce" class="charCard">
      <h4>force</h4>
      <div class="charRank">
        {{ characteristics.forceRank }}
      </div>
    </div>
  </div>
</template>

<script>
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

  props: {
    characteristics: {},
  },

  computed: {
    hasForce() {
      return this.characteristics.hasForce;
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
  },
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
