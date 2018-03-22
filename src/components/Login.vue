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
.form-group {
  position: relative;
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;
}

input {
  position: relative;
  width: 20rem;
  height: 2rem;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(99, 99, 99, 1);
  color: rgba(99, 99, 99, 1);
  transition: all 250ms linear;
  font-weight: 100;

  @media (min-width: 767px) {
    opacity: 0.7;
  }

  @media (max-width: 766px) {
    opacity: 1;
  }

  &::placeholder {
    text-transform: uppercase;
    transition: all 1s linear;
  }

  &:hover {
    opacity: 1;
    &::placeholder {
    }
  }

  &:focus {
    color: rgba(99, 99, 99, 1);
    opacity: 1;

    &::placeholder {
      opacity: 0;
    }
  }
}

.animated-border {
  position: absolute;
  bottom: 0;
  width: 0%;
  left: 50%;
  transition: all 100ms linear;
}

input:invalid {
  box-shadow: none;
}

input:focus + .animated-border,
input:valid + .animated-border {
  width: 100%;
  left: 0;
  border-top: 1px solid rgba(99, 99, 99, 1);
}
</style>
