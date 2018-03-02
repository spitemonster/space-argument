<template>
  <div>
    <form>
      <input type="text" placeholder="email" v-model="email"></input>
      <input type="password" placeholder="password" v-model="password"></input>
      <input required type="text" placeholder="Character Name" v-model="character.name"></input>
      <input required type="text" placeholder="Species" v-model="character.species"></input>
      <input required type="text" placeholder="Career" v-model="character.career"></input>
      <input required type="text" placeholder="Specialization" v-model="character.specialization"></input>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
