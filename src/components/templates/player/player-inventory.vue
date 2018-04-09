<template>
  <div id="inventory">
    <h3>Weapons</h3>
    <ul>
      <li class="weapons"
          v-for="shooster in this.weapons"
          :data-gun="shooster['.key']"
          :class="isEquipped(shooster, 'gun')"
          @click="equip($event, 'weapons')">

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
          :class="isEquipped(arm, 'armor')"
          @click="equip($event, 'armor')">

        <h4>{{ arm.name }}</h4>
        <ul>
          <li>Def: {{ arm.defense }}</li>
          <li>Soak: {{ arm.soak }}</li>
        </ul>
      </li>
    </ul>
    <h3 v-if="hasMedical || hasRepair">Medical</h3>
      <div v-if="hasMedical">
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
      </div>
      <div v-if="hasRepair">
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
    </div>
</template>

<script>
import { bus } from '../../../bus.js'

export default {
  name: 'player-inventory',

  props: {
    current: '',
    weaponsRef: {},
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

  computed: {
    //determine if character has a medpac
    hasMedical() {
      if (!this.meat['Medpac']) {
        return false;
      } else {
        return true;
      }
    },
    //same with repair kit
    hasRepair() {
      if(!this.machine['Repair Kit']) {
        return false;
      } else {
        return true;
      }
    }
  },

  mounted() {
    let party = this.team;
    let now = new Date().getTime();
    let meds = ['meat', 'machine'];
    let guns = document.getElementsByClassName('weapons');

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
    if (this.hasMedical || this.hasRepair) {
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
    }
  },

  methods: {
    //determine if item is equipped
    isEquipped(input, type) {
      let eq = '';

      if (input.equipped != 'true') {
        return;
      }

      if (type == 'gun') {
        eq = 'equippedWeapon';
      } else {
        eq = 'equippedArmor';
      }

      return eq;
    },

    equip(e, type) {
      //set up vars. bf...was random.
      let bf = e.target;
      let item = '';
      let items = document.getElementsByClassName(type);
      let targetClass;
      let gunArm;
      let ref = String(type + 'Ref');


      if (type == 'weapons') {
        gunArm = 'data-gun';
        targetClass = 'equippedWeapon';
      } else if (type == 'armor') {
        gunArm = 'data-armor';
        targetClass = 'equippedArmor';
      }

      let target = document.getElementsByClassName(type);

      //make sure we're getting the key. not sure of a better way to do this.
      if (bf.getAttribute(gunArm)) {
        item = bf.getAttribute(gunArm);
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.classList.add(targetClass);
      } else if (bf.parentNode.getAttribute(gunArm)) {
        item = bf.parentNode.getAttribute(gunArm);
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.parentNode.classList.add(targetClass);
      } else if (bf.parentNode.parentNode.getAttribute(gunArm)) {
        item = bf.parentNode.parentNode.getAttribute(gunArm);
        for (let i = 0; i < target.length; i++) {
          target[i].classList.remove(targetClass);
        }
        bf.parentNode.parentNode.classList.add(targetClass);
      } else {
        console.log('uh oh, you clicked on something dumb');
      }

      // set all of the items to unequipped
      for (let i = 0; i < this[type].length; i++) {
        this[ref].child(this[type][i]['.key']).child('equipped').set('false');
      }

      //equip target item
      this[ref].child(item).child('equipped').set('true');
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
    width: 160px !important;
    background: none;
    border: 1px solid $black;
    padding: .25rem;
    font-size: .8rem;
    box-sizing: border-box;
    height: 40px;
    margin-right: 1rem;
    option {
      text-transform: uppercase;
    }
  }

  button {
    height: 40px;
    padding: .5rem;
  }
}
</style>
