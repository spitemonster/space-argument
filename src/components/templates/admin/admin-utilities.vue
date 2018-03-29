<template lang="html">
  <div id="util">
    <button @click="healAll">HEAL PARTY</button>
    <input type="number" v-model="exp" />
    <button @click="giveExp">GIVE EXP</button>

    <section class="give">
      <section>
        <select v-model="player">
          <option v-for="member in team"
                  :value="member.key">{{ member.name }}</option>
        </select>
        <input v-model="weapon.name" placeholder="Name" required />
        <input v-model="weapon.damage" placeholder="Damage" required />
        <input v-model="weapon.crit" placeholder="Crit" required/>
        <select v-model="weapon.skill">
          <option value="Ranged (Heavy)">Ranged (Heavy)</option>
          <option value="Ranged (Light)">Ranged (Light)</option>
          <option value="Melee">Melee</option>
        </select>
        <input v-model="weapon.other" placeholder="Other" required/>

        <button @click="giveWeapon">GIVE WEAPON</button>
      </section>

      <section>
        <select v-model="player">
          <option v-for="member in team"
                  :value="member.key">{{ member.name }}</option>
        </select>
        <input v-model="armor.name" placeholder="Name" required />
        <input v-model="armor.soak" placeholder="Damage" required />

        <button @click="giveArmor">GIVE ARMOR</button>
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
      weapon: {
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
      player: ''
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
    console.log(this.team);
  },

  methods: {
    healAll() {
      //iterates through the party and resets their wound
      for (let member in this.team) {
        let fullHealth = this.team[member].woundThresh;
        this.refs.child(member).child('woundCurrent').set(fullHealth);
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

    giveWeapon() {
      //takes weapon object created by filling in data above and gives it to selected player
      this.refs.child(this.player).child('inventory').child('weapons').push(this.weapon);
      //reset weapon info
      this.player = '';
      this.weapon.name = '',
      this.weapon.damage = '',
      this.weapon.crit = '',
      this.weapon.skill = '',
      this.weapon.other = ''
    },

    giveArmor() {
      //takes armor object created by filling in data above and gives it to selected player
      this.refs.child(this.player).child('inventory').child('armor').push(this.armor);
      //resets armor info
      this.player = '';
      this.armor.name = '',
      this.armor.soak = ''
    },
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

  @media (min-width: 960px) {
    flex-direction: row;
  }

  @media (max-width: 959px) {
    flex-direction: column;
  }

  section {
    @media (min-width: 960px) {
      width: 50%;
    }

    @media (max-width: 959px) {
      width: 100%;
    }
    padding: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    input,
    select {
      margin-bottom: 1rem;
    }

    select {
      background: none;
      border: 1px solid $black;
    }
  }
}
</style>
