<template>
  <div>
    <div id="characteristics">
      <div class="charCard" @click="showThis">
        <h4>brawn</h4>
        <div class="charRank">
          {{ characteristics.br.val }}
        </div>
      </div>

      <div class="charCard" @click="showThis">
        <h4>agility</h4>
        <div class="charRank">
          {{ characteristics.ag.val }}
        </div>
      </div>

      <div class="charCard" @click="showThis">
        <h4>intellect</h4>
        <div class="charRank">
          {{ characteristics.int.val }}
        </div>
      </div>

      <div class="charCard" @click="showThis">
        <h4>cunning</h4>
        <div class="charRank">
          {{ characteristics.cun.val }}
        </div>
      </div>

      <div class="charCard" @click="showThis">
        <h4>willpower</h4>
        <div class="charRank">
          {{ characteristics.will.val }}
        </div>
      </div>

      <div class="charCard" @click="showThis">
        <h4>presence</h4>
        <div class="charRank">
          {{ characteristics.pres.val }}
        </div>
      </div>

      <div v-if="hasForce" class="charCard">
        <h4>force</h4>
        <div class="charRank">
          {{ characteristics.force.val }}
        </div>
      </div>
    </div>
    <button @click="showAll" id="showAll">SHOW ALL</button>
  </div>
</template>

<script>
import { bus } from '../../../bus.js'

export default {
  name: 'player-characteristics',

  props: {
    characteristics: {},
    current: '',
    hasForce: false
  },

  data() {
    return {
      showAllChars: false
    }
  },

  created() {
    bus.$on('showAll', () => {
      this.showAllChars = !this.showAllChars;
    })
  },

  methods: {
    //gets inner HTML to determine which characteristic has been selected, emits it on the bus which gets picked up elsewhere. also removes/adds 'activeCard' class
    showThis(e) {
      let activeCards = document.getElementsByClassName('activeCard');
      let card = e.target.parentNode.childNodes[2];
      console.log(this.showAllChars);

      function removeClass() {
        //loop through all of the active cards and remove the active card class
        for (let i = 0; i < activeCards.length; i++) {
          activeCards[i].classList.remove('activeCard');
        }
      }

      function cycle(target) {
        //emit target innerHTML that tells which char was selected on the bus to fux wit elsewhere
        bus.$emit('showChar', target.innerHTML);
        if (!card.classList.contains('activeCard')) {
          //if the target 'charCard' is not the 'activeCard'
          removeClass();
          //add activeCard class to target
          card.classList.add('activeCard');
        } else if (card.classList.contains('activeCard')) {
          // if target card DOES have 'activeCard' class, remove it
          card.classList.remove('activeCard');
        } else if (card.classList.contains('activeCard') && this.showAll) {
          //if the target 'charCard' is not the 'activeCard'
          //add activeCard class to target
          card.classList.add('activeCard');
        }
      }

      //do the stuff
      if (e.target.tagName == 'H4') {
        //if user clicks on the h4, sends content of h4
        cycle(e.target);
      } else if (e.target.parentNode.childNodes[0].tagName == 'H4') {
        //if they click on the sibling of the h4, sends content of h4
        cycle(e.target.parentNode.childNodes[0])
      }
    },

    showAll() {
      //shows all skills. doesn't work as well as I want but it at least accomplishes the goal
      let activeCards = document.getElementsByClassName('activeCard');

      for (let i = 0; i < activeCards.length; i++) {
        activeCards[i].classList.remove('activeCard');
      }

      bus.$emit('showAll');
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

    * {
      -webkit-user-select: none;  /* Chrome all / Safari all */
         -moz-user-select: none;     /* Firefox all */
          -ms-user-select: none;      /* IE 10+ */
              user-select: none;
    }
  }

  .activeCard {
    background: $black;
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

#showAll {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: $gray;
  margin-top: 1rem;

  &:hover {
    color: $white;

    &:before {
      background: $gray;
    }
  }
}
</style>
