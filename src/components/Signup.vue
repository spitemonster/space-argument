<template>
  <div>
    <form>
      <input type="text" placeholder="email" v-model="email" required></input>
      <input type="password" placeholder="password" v-model="password" required></input>
      <input type="text" placeholder="Character Name" v-model="character.name" required></input>
      <input type="text" placeholder="Species" v-model="character.species" required></input>
      <input type="text" placeholder="Career" v-model="character.career" required></input>
      <input type="text" placeholder="Specialization" v-model="character.specialization" required></input>
      <button type="button" @click="createUser">Sign Up</button>
    </form>
  </div>
</template>

<script>
import Character from '../assets/js/character';

export default {
  name: 'Signup',

  data () {
    return {
      email: '',
      password: '',
      name: '',
      species: '',
      career: '',
      specialization: '',
      character: new Character
    }
  },
  
  methods: {
    //this will eventually all get deleted; don't want anyone unwelcome making an account and making fuck of the whole thing, this is just the easiest way for me to create each player
    createUser () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then( e => {
          let playerID = firebase.auth().currentUser.uid
          firebase.database().ref('players/' + playerID).set(this.character);
          this.$router.replace('login');
      }, (err) => {
          alert('Oops ' + err.message);
      });
    },
  }
}
</script>

<style lang="scss">
@import '../assets/css/_variables.scss';

</style>
