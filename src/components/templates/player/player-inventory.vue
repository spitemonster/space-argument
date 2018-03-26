<template>
  <div id="inventory">
    <h3>Weapons</h3>
    <ul>
      <li class="weapon"
          v-for="shooster in this.shoosters"
          :data-gun="shooster['.key']"
          @click="equipWeapon"
          v-bind:class="isEquipped(shooster)">

        <h4>{{ shooster.name }} - {{ shooster.skill}}</h4>

        <ul>
          <li>Damage: {{ shooster.damage }}</li>
          <li>Crit: {{ shooster.crit }}</li>
          <li>Enc: {{ shooster.encumberance }}</li>
        </ul>

      </li>
    </ul>
    <h3>Armor</h3>
    <ul>
      <li class="armor"
          v-for="arm in this.armor"
          :data-armor="arm['.key']"
          @click="equipArmor"
          v-bind:class="isEquipped(arm)">

        <h4>{{ arm.name }}</h4>
        <ul>
          <li>Def: {{ arm.defense }}</li>
          <li>Soak: {{ arm.soak }}</li>
          <li>Enc: {{ arm.encumberance }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import db from '../../../assets/js/firebaseConfig.js'
import { bus } from '../../../bus.js'

export default {
  name: 'player-inventory',
  data() {
    return {
      inventory: false
    }
  },

  props: {
    current: ''
  },

  computed: {
  },

  //brought firebase in on this one because i needed to be able to changed the equipped weapon reactively, can't do that with props
  firebase: function() {
    return {
      shoosters: db.ref('players/' + this.current + '/inventory/weapons'),
      armor: db.ref('players/' + this.current + '/inventory/armor'),
    }
  },

  methods: {
    //determine if item is equipped
    isEquipped(input) {
      let eq = '';

      if (input.equipped == 'true') {
        eq = 'equippedArmor';
      }

      return eq;
    },

    //set clicked item to equipped
    equipWeapon(e) {
      //set up vars. bf...was random.
      let bf = e.target;
      let gun = '';
      let weapons = document.getElementsByClassName('weapon');
      let targetClass = 'equipped';
      let target = document.getElementsByClassName(targetClass);

      //make sure we're getting the key. not sure of a better way to do this.
      if (bf.getAttribute('data-gun')) {
        gun = bf.getAttribute('data-gun');
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.classList.add('equipped');
      } else if (bf.parentNode.getAttribute('data-gun')) {
        gun = bf.parentNode.getAttribute('data-gun');
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.parentNode.classList.add('equipped');
      } else if (bf.parentNode.parentNode.getAttribute('data-gun')) {
        gun = bf.parentNode.parentNode.getAttribute('data-gun');
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.parentNode.parentNode.classList.add('equipped');
      } else {
        console.log('uh oh, you clicked on something dumb');
      }

      //set all of the items to unequipped
      for (let i = 0; i < this.shoosters.length; i++) {
        this.$firebaseRefs.shoosters.child(this.shoosters[i]['.key']).child('equipped').set('false');
      }

      //equip target item
      this.$firebaseRefs.shoosters.child(gun).child('equipped').set('true');
    },

    equipArmor(e) {
      //set up vars. bf...was random.
      let bf = e.target;
      let armor = '';
      let armors = document.getElementsByClassName('armor');
      let targetClass = 'equippedArmor';
      let target = document.getElementsByClassName(targetClass);

      //make sure we're getting the key. not sure of a better way to do this.
      if (bf.getAttribute('data-armor')) {
        armor = bf.getAttribute('data-armor');
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.classList.add('equippedArmor');
      } else if (bf.parentNode.getAttribute('data-armor')) {
        armor = bf.parentNode.getAttribute('data-armor');
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.parentNode.classList.add('equippedArmor');
      } else if (bf.parentNode.parentNode.getAttribute('data-armor')) {
        armor = bf.parentNode.parentNode.getAttribute('data-armor');
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.parentNode.parentNode.classList.add('equippedArmor');
      } else {
        console.log('uh oh, you clicked on something dumb');
      }

      //set all of the items to unequipped
      for (let i = 0; i < this.armor.length; i++) {
        this.$firebaseRefs.armor.child(this.armor[i]['.key']).child('equipped').set('false');
      }

      //equip target item
      this.$firebaseRefs.armor.child(armor).child('equipped').set('true');
    }
  },

  created() {
  },

  mounted() {
  }
}
</script>

<style lang="scss">
@import '../../../assets/css/_variables.scss';

#inventory {
  margin-top: 2rem;

  ul {
    list-style: none;
  }

  & > ul > li {
    margin-bottom: 1rem;

    li {
      margin-left: 1rem;
      margin-bottom: .5rem;
      display: inline-flex;
    }
  }
}

.equipped,
.equippedArmor {
  display: block;
  position: relative;
  border: 1px solid $black;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;

  }
}

</style>
