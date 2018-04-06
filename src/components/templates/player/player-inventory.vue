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
          <option v-for="player in players" :value="player.key" v-if="player.species != 'Droid'">{{ player.name }}</option>
        </select>
        <button @click="testHeal(med.uses, med.lastUsed)">
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
          <option v-for="player in players" :value="player.key" v-if="player.species == 'Droid'">{{ player.name }}</option>
        </select>
        <button @click="testRepair(med.uses, med.lastUsed)">
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
    }
  },

  mounted() {
    let party = this.team;

    //build array out of team array for easy sorting
    for (let i = 0; i < party.length; i++) {
      if (party[i].name) {
        let character = {};
        character.name = party[i].name;
        character.key = party[i]['.key'];
        character.species = party[i].species;
        this.players.push(character);
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

    //brief aside. these two are exactly the same function except for a couple keywords, and the v-for loops with which they are associated have v-if statements in them, which i know isn't ideal but honestly i was having souble trouble with this and got frustrated and just wanted to be done with it. 
    testHeal(data, lastUsed) {
      let now = new Date().getTime();
      let usesAvailable = data;
      //check if it's been 24hours since the last use
      if (((now - lastUsed) / 3600000) < 24 && usesAvailable == 0) {
        return;
      } else if (((now - lastUsed) / 3600000) >= 24 && usesAvailable == 0) {
        usesAvailable = 5;
      }

      //loop through team array and find the player on whom we'll be using the medpack
      for (let i = 0; i < this.team.length; i++) {
        //once you've found target user, get info and establish wound stats and all that
        if (this.team[i]['.key'] == this.medpacTarget) {
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
            return h;
          }

          // this.medicalRef.child('Medpac').child('uses').set(remainingUses);

          let remainingUses = usesAvailable - 1;
          this.teamRef.child(this.medpacTarget).child('woundCurrent').set(resultingHealth());
          this.medicalRef.child('meat').child('Medpac').child('uses').set(remainingUses);

          if (remainingUses == 0) {
            let lastUsed = new Date().getTime();
            this.medicalRef.child('meat').child('Medpac').child('lastUsed').set(lastUsed);
          }
        }
      }
    },
    testRepair(data, lastUsed) {
      let now = new Date().getTime();
      let usesAvailable = data;
      //check if it's been 24hours since the last use
      if (((now - lastUsed) / 3600000) < 24 && usesAvailable == 0) {
        return;
      } else if (((now - lastUsed) / 3600000) >= 24 && usesAvailable == 0) {
        usesAvailable = 5;
      }

      //loop through team array and find the player on whom we'll be using the medpack
      for (let i = 0; i < this.team.length; i++) {
        //once you've found target user, get info and establish wound stats and all that
        if (this.team[i]['.key'] == this.repairKitTarget) {
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
            return h;
          }

          // this.medicalRef.child('Medpac').child('uses').set(remainingUses);

          let remainingUses = usesAvailable - 1;
          this.teamRef.child(this.repairKitTarget).child('woundCurrent').set(resultingHealth());
          this.medicalRef.child('machine').child('Repair Kit').child('uses').set(remainingUses);

          if (remainingUses == 0) {
            let lastUsed = new Date().getTime();
            this.medicalRef.child('machine').child('Repair Kit').child('lastUsed').set(lastUsed);
          }
        }
      }
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
