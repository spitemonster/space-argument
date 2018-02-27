<template>
  <div>
    <form>
      <input type="text" placeholder="email" v-model="email"></input>
      <input type="password" placeholder="password" v-model="password"></input>
      <select id="char">
        <option value="Erdahl">Erdahl</option>
        <option value="Moog Moog">Moog Moog</option>
        <option value="John">John</option>
        <option value="K1LL">K1-LL</option>
        <option value="ZaAt">ZaAt</option>
      </select>
      <button type="button" @click="createUser">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    createUser () {
      let char = document.getElementById('char');
      let sel = char.value;
      let charStats = null;

      //replace this with something more elegant at some point
      if (sel == 'Erdahl') {
        charStats = {
          character: 'Erdahl',
          race: 'Human',
          crap: 'Stuff',
          type: 'Player'
        }
      } else if (sel == 'Moog Moog') {
        charStats = {
          character: 'Moog Moog',
          race: 'Rodian',
          crap: 'Things',
          type: 'Player'
        }
      } else if (sel == 'John') {
        charStats = {
          character: 'John',
          race: 'Human',
          crap: 'Things',
          type: 'Player'
        }
      } else if (sel == 'K1LL') {
        charStats = {
          character: 'K1-LL',
          race: 'Droid',
          crap: 'Things',
          type: 'Player'
        }
      } else if (sel == 'ZaAt') {
        charStats = {
          character: 'ZaAt',
          race: 'Trandoshan',
          crap: 'Things',
          type: 'Player'
        }
      }

      //if statement really needs to get shortened but I'm not sure how
      if (sel == 'Erdahl' || sel == 'Moog Moog' || sel == 'John' || sel == 'K1LL' || sel == 'ZaAt') {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then( e => {
          let playerID = firebase.auth().currentUser.uid
          firebase.database().ref('players/' + playerID).set(charStats);
        }, (err) => {
          alert('Oops ' + err.message);
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
