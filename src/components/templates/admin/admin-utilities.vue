<template lang="html">
  <div id="util">
    <button @click="healAll">HEAL PARTY</button>
    <input type="number" v-model="exp" />
    <button @click="giveExp">GIVE EXP</button>

    <section class="give">
      <section>
        <h4>WEAPON</h4>
        <select v-model="player" required>
          <option value="" selected>Select Character</option>
          <option v-for="member in team"
                  :value="member.key">{{ member.name }}</option>
        </select>
        <input v-model="weapons.name" placeholder="Name" required />
        <input v-model="weapons.damage" placeholder="Damage" required />
        <input v-model="weapons.crit" placeholder="Crit" required/>
        <select v-model="weapons.skill">
          <option value="Ranged (Heavy)">Ranged (Heavy)</option>
          <option value="Ranged (Light)">Ranged (Light)</option>
          <option value="Melee">Melee</option>
        </select>
        <input v-model="weapons.other" placeholder="Other" required/>

        <button @click="giveEquipment('weapons')">GIVE WEAPON</button>
      </section>

      <section>
        <h4>ARMOR</h4>
        <select v-model="player" required>
          <option value="" selected>Select Character</option>
          <option v-for="member in team"
                  :value="member.key">{{ member.name }}</option>
        </select>
        <input v-model="armor.name" placeholder="Name" required />
        <input v-model="armor.soak" placeholder="Soak" required />

        <button @click="giveEquipment('armor')">GIVE ARMOR</button>
      </section>

      <section>
        <h4>MEDICAL</h4>
        <select v-model="player" required>
          <option value="" selected>Select Character</option>
          <option v-for="member in team"
                  :value="member.key">{{ member.name }}</option>
        </select>
        <select v-model="medical" required>
          <option value="">Select Medical</option>
          <option value="Medpac">Medpac</option>
          <option value="Repair Kit">Repair Kit</option>
        </select>

        <button @click="giveMedical()">GIVE MEDICAL</button>
      </section>

      <section>
        <h4>PARTY ITEMS</h4>
        <input v-model="partyItem.name" placeholder="Name" required>
        <input v-model="partyItem.info" placeholder="Info" required>

        <button @click="givePartyItem()">GIVE PARTY ITEM</button>
      </section>

    </section>
  </div>
</template>

<script>

export default {
  name: 'admin-utilities',

  props: {
    refs: {},
    party: {}
  },

  data() {
    return {
      team: {},
      exp: 0,
      weapons: {
        name: '',
        damage: '',
        crit: '',
        skill: '',
        other: '',
        equipped: false,
      },
      armor: {
        name: '',
        soak: '',
        enc: 0
      },
      player: '',
      Medpac: {
        uses: 5,
        lastUsed: 0
      },
      'Repair Kit': {
        uses: 5,
        lastUsed: 0
      },
      medical: '',
      partyItem: {
        name: '',
        info: ''
      }
    }
  },

  created() {
    //filter through 'party' and remove admin and blank accounts and creates 'team' object
    for (let member in this.party) {
      // if party character has a name, add character object to team object, then add userID to character object as key
      if (this.party[member].name) {
        this.team[member] = this.party[member];
        this.team[member].key = member;
      }
    }
  },

  methods: {
    healAll() {
      //iterates through the party and resets their wound
      for (let member in this.team) {
        let fullHealth = this.team[member].woundThresh;
        this.refs.child(member).child('woundCurrent').set(fullHealth);

        if (this.team[member].hasForce) {
          let fullForce = this.team[member].forceAvail;
          this.refs.child(member).child('forceCommit').set(fullForce);
        }
      }
    },

    giveExp() {
      //iterates through party and gives each an amount of xp set by dm
      for (let member in this.team) {
        let currentExp = this.party[member].availableXP;
        let totalExp = parseInt(currentExp) + parseInt(this.exp);

        this.refs.child(member).child('availableXP').set(totalExp).then(() => {
          this.exp = 0;
        });
      }
    },

    giveEquipment(data) {
      //given 'data' which is either weapons or armor, push this[data] to appropriate inventory category
      this.refs.child(this.player).child('inventory').child(data).push(this[data]);

      //then reset applicable fields; in the weapon or armor object just iterate through each key and reset after submit
      this.player = '';
      for (let key in this[data]) {
        this[data][key] = '';
      }
    },

    giveMedical() {
      //similar to above, but because of the structure of medical sitch, have to do things a little differently

      let med = this.medical;
      let cat;
      let item = this[this.medical];

      //sets category based on which item is selected
      if (med == 'Repair Kit') {
        cat = 'machine'
      } else if (med == 'Medpac') {
        cat = 'meat'
      }

      this.refs.child(this.player).child('inventory').child('medical').child(cat).child(med).set(item).then(() => {
        this.player = '';
        this.medical = '';
      });
    },

    givePartyItem() {
      this.refs.child('partyInventory').child(this.partyItem.name).set(this.partyItem.info).then(() => {
        this.partyItem.name = '';
        this.partyItem.info = '';
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/_variables.scss';

#util {
  padding: 3rem;
}

button {
  font-size: 1rem;
  padding: 2rem 3rem;
  margin: 0 auto;
  width: 100%;
}

input[type=number] {
  margin: 3rem auto;
}

.give {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 960px) {
    flex-direction: row;
  }

  @media (max-width: 959px) {
    flex-direction: column;
  }

  section {
    h4 {
      margin-bottom: 1rem;
      width: 100%;
      align-self: flex-start;
    }

    @media (min-width: 960px) {
      width: calc(50% - 10px);
    }

    @media (max-width: 959px) {
      width: 100%;
    }
    padding: .5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid lighten($black, 60%);
    margin: 5px;
    align-items: flex-end;

    button {
      height: 100px;
    }

    input,
    select {
      margin-bottom: 1rem;
      width: 100%;
    }

    select {
      background: none;
      border: 1px solid $black;
    }
  }
}
</style>
