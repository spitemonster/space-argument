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
    <h3>Medical</h3>
    <div class="medical" v-for="(med, k) in meat" v-if="k != '.key'">
      <div>
        <h4>{{ k }}</h4>
        <p>{{ med.uses }}</p>
      </div>
      <div>
        <select v-model="medpacTarget">
          <option v-for="player in people" :value="player.key">{{ player.name }}</option>
        </select>
        <button @click="heal(med.uses, med.lastUsed, 'meat')">
          HEAL
        </button>
      </div>
    </div>
    <div class="medical" v-for="(med, k) in machine" v-if="k != '.key'">
      <div>
        <h4>{{ k }}</h4>
        <p>{{ med.uses }}</p>
      </div>
      <div>
        <select v-model="repairKitTarget">
          <option v-for="player in droids" :value="player.key">{{ player.name }}</option>
        </select>
        <button @click="heal(med.uses, med.lastUsed, 'machine')">
          HEAL
        </button>
      </div>
    </div>
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
    medicalRef: {},
    meat: {},
    machine: {}
  },

  data() {
    return {
      inventory: false,
      players: [],
      medpacTarget: '',
      repairKitTarget: '',
      meds: {},
      people: [],
      droids: []
    }
  },

  mounted() {
    let party = this.team;
    let now = new Date().getTime();
    let meds = ['meat', 'machine'];

    //split team into droids and people to minimize code and logic up top
    for (let i = 0; i < party.length; i++) {
      if (party[i].name) {
        let character = {};
        character.name = party[i].name;
        character.key = party[i]['.key'];
        character.species = party[i].species;

        //if character is made of meat, add to people array, otherwise add to droids array
        if (character.species != 'Droid') {
          this.people.push(character);
        } else {
          this.droids.push(character);
        }
      }
    }

    //loop through meds; if they haven't been used in 24 hours, reset their uses.
    for (let i = 0; i < meds.length; i++) {
      let m = meds[i];
      for (let med in this[m]) {
        if (this[m][med].lastUsed) {
          if (((now - this[m][med].lastUsed) / 3600000) >= 24) {
            this.medicalRef.child(m).child(med).child('uses').set(5);
          }
        }
      }
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
    },

    heal(data, lastUsed, category) {
      let now = new Date().getTime();
      let usesAvailable = data;
      let healTarget;
      let implement;
      let target = category;
      let remainingUses;

      //get category from arguments, depending on if we're healing a droid or meatbag, we set the healTarget and implement to either a meatbag or a droid and to a medpac or repair kit
      if (target == 'meat') {
        healTarget = this.medpacTarget;
        implement = 'Medpac';
      } else if (target == 'machine') {
        healTarget = this.repairKitTarget;
        implement = 'Repair Kit';
      }

      //check if it's been 24hours since the last use
      if (((now - lastUsed) / 3600000) < 24 || usesAvailable == 0) {
        return;
      }

      //loop through team array and find the player on whom we'll be using the medpack
      for (let i = 0; i < this.team.length; i++) {
        //once you've found target user, get info and establish wound stats and all that
        if (this.team[i]['.key'] == healTarget && this.team[i].woundCurrent < this.team[i].woundThresh) {
          let currentHealth = parseInt(this.team[i].woundCurrent);
          let healFactor = parseInt(usesAvailable);
          //calculate the health result, based on current wound, threshold and such
          let resultingHealth = () => {
            let result = currentHealth + healFactor;
            let h = null;
            if (result > this.team[i].woundThresh) {
              h = this.team[i].woundThresh;
            } else if (result <= this.team[i].woundThresh) {
              h = result;
            }

            remainingUses = usesAvailable - 1;
            return h;
          }

          //sets target health to the result of resultingHealth(), and sets the remainingUses of whatever healing implement to
          this.teamRef.child(healTarget).child('woundCurrent').set(resultingHealth());
          this.medicalRef.child(target).child(implement).child('uses').set(remainingUses);

          //if this use is the last use, set the lastUsed time so we can keep track of whether or not it's okay to use.
          if (remainingUses == 0) {
            let lastUsed = new Date().getTime();
            this.medicalRef.child(target).child(implement).child('lastUsed').set(lastUsed);
          }
        }
      }
    },
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

.medical {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin-left: 1rem;
  }

  div {
    max-width: 100%;
  }

  select {
    max-width: 300px;
  }
}
</style>
