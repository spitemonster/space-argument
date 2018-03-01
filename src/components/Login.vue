<template>
  <div id="login">
    <form class="login-form">
      <input type="text" placeholder="email" v-model="email"></input>
      <input type="password" placeholder="password" v-model="password"></input>
      <button type="button" @click="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      type: ''
    }
  },
  methods: {
    redirect() {
      if (this.type == 'Player') {
        this.$router.replace('Character')
      } else if (this.type == 'DM') {
        this.$router.replace('Admin')
      }
    },
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(e => {
        let current = firebase.auth().currentUser.uid;

        firebase.database().ref('players/' + current).once('value', (data) => {
          this.type = data.val().type

          this.redirect();
        });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
