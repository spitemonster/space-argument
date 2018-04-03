<template>
  <div id="signup">
    <form>
      <input type="text" placeholder="email" v-model="email" required></input>
      <input type="password" placeholder="password" v-model="password" required></input>
      <button type="button" @click="createUser">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    //this will eventually all get deleted; don't want anyone unwelcome making an account and making fuck of the whole thing, this is just the easiest way for me to create each player
    createUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          e => {
            let playerID = firebase.auth().currentUser.uid
            firebase
              .database()
              .ref('players/' + playerID)
              .child('type')
              .set('new')
            this.$router.replace('login')
          },
          err => {
            alert('Oops ' + err.message)
          }
        )
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/_variables.scss';
@import '../assets/css/_global.scss';

#signup {
  padding-top: 5rem;
  margin: 0 auto;

  @media (min-width: 960px) {
    width: 50%;
  }

  @media (max-width: 959px) {
    width: 80%;
  }

  input {
    margin-bottom: .5rem;
  }

  button {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
  }
}
</style>
