<template>
  <div id="inventory">
    <h3>Weapons</h3>
    <ul>
      <li class="weapon"
          v-for="shooster in this.weapons"
          :data-gun="shooster['.key']"
          :class="isEquipped(shooster)"
          @click="equipWeapon">

        <h4>{{ shooster.name }} - {{ shooster.skill}}</h4>

        <ul>
          <li>Damage: {{ shooster.damage }}</li>
          <li>Crit: {{ shooster.crit }}</li>
        </ul>

      </li>
    </ul>
    <h3>Armor</h3>
    <ul>
      <li class="armor"
          v-for="arm in this.armor"
          :data-armor="arm['.key']"
          :class="isEquipped(arm)"
          @click="equipArmor">

        <h4>{{ arm.name }}</h4>
        <ul>
          <li>Def: {{ arm.defense }}</li>
          <li>Soak: {{ arm.soak }}</li>
        </ul>
      </li>
    </ul>
    <!-- <h3>Medical</h3> -->
    <!-- <ul>
      <li class="medical"
          v-for=""></li>
    </ul> -->
  </div>
</template>

<script>
import { bus } from '../../../bus.js'

export default {
  name: 'player-inventory',

  props: {
    current: '',
    weaponRef: {},
    armorRef: {},
    weapons: {},
    armor: {},
    team: {},
    teamRef: {},
    medical: {},
    medicalRef: {}
  },

  data() {
    return {
      inventory: false
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

    //set clicked item to equipped. will try to refactor at some point since this and the armor function are essentially the same
    equipWeapon(e) {
      //set up vars. bf...was random.
      let bf = e.target;
      let gun = '';
      let weapons = document.getElementsByClassName('weapon');
      let targetClass = 'equippedWeapon';
      let target = document.getElementsByClassName(targetClass);

      //make sure we're getting the key. not sure of a better way to do this.
      if (bf.getAttribute('data-gun')) {
        gun = bf.getAttribute('data-gun');
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.classList.add('equippedWeapon');
      } else if (bf.parentNode.getAttribute('data-gun')) {
        gun = bf.parentNode.getAttribute('data-gun');
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.parentNode.classList.add('equippedWeapon');
      } else if (bf.parentNode.parentNode.getAttribute('data-gun')) {
        gun = bf.parentNode.parentNode.getAttribute('data-gun');
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.parentNode.parentNode.classList.add('equippedWeapon');
      } else {
        console.log('uh oh, you clicked on something dumb');
      }

      //set all of the items to unequipped
      for (let i = 0; i < this.weapons.length; i++) {
        // console.log(this.weapons[i]['.key']);
        this.weaponRef.child(this.weapons[i]['.key']).child('equipped').set('false');
      }

      //equip target item
      this.weaponRef.child(gun).child('equipped').set('true');
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
        this.armorRef.child(this.armor[i]['.key']).child('equipped').set('false');
      }

      //equip target item
      this.armorRef.child(armor).child('equipped').set('true');
    }
  },
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

.equippedWeapon,
.equippedArmor {
  display: block;
  position: relative;
  border: 1px solid $black;
  padding: 1rem;

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
