<template>
  <div id="login">
    <form class="login-form">
      <div class="form-group">
        <input type="text" placeholder="username" v-model="email" required></input>
        <span class="animated-border"></span>
      </div>
      <div class="form-group">
        <input type="password" placeholder="password" v-model="password" @keyup.enter="login" required></input>
        <span class="animated-border"></span>
      </div>
      <button @click="login">Log In</button>
    </form>
  </div>
</template>

<script>
import db from '../assets/js/firebaseConfig.js'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      type: ''
    }
  },

  methods: {
    redirect() {
        this.$router.replace('Dashboard');
    },

    login() {
      let username = this.email + '@spaceargument.com'

      firebase
        .auth()
        .signInWithEmailAndPassword(username, this.password)
        .then(e => {
          let current = firebase.auth().currentUser.uid

          db.ref('players/' + current).once('value', data => {
            this.type = data.val().type

            this.redirect()
          })
        })
    }
  },
  beforeCreate() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/css/_variables.scss';
#login {
  position: relative;
  height: 100%;
  width: 100%;
}

.login-form {
  margin: 0 auto;
  width: 50%;
  height: 250px;
  position: relative;
  top: 20vh;

  button {
    width: 100%;
    padding: 1em;
  }
}

.form-group {
  position: relative;
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;
}

.animated-border {
  position: absolute;
  bottom: 0;
  width: 0%;
  left: 50%;
  transition: all 100ms linear;
}
</style>
