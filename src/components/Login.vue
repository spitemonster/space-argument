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
      } else if (this.type == 'Admin') {
        this.$router.replace('Admin')
      }
    },

    login() {
      let username = this.email + '@spaceargument.com';

      firebase.auth().signInWithEmailAndPassword(username, this.password).then(e => {
        let current = firebase.auth().currentUser.uid;

        db.ref('players/' + current).once('value', (data) => {
          this.type = data.val().type

          this.redirect();
        });
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .form-group {
    position: relative;
    width: 100%;
    height: 2rem;
    margin-bottom: 1rem;
  }

  .login-form button {
    background: none;
    border: 1px solid rgba(99,99,99,1);
    color: rgba(99,99,99,1);
    text-transform: uppercase;
    position: relative;
    cursor: pointer;
    z-index: 99;
    transition: all 100ms linear;

    &:hover {
      border-color: rgb(222,222,222);
      color: rgba(222,222,222,1);

      &::before {
        left: 0;
        width: 100%;
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 0%;
      height: 100%;
      transition: all 100ms ease-out;
      background: rgba(99,99,99,1);
      z-index: -1;
    }
  }

  input {
    position: relative;
    width: 20rem;
    height: 2rem;
    background: none;
    border: none;
    border-bottom: 1px solid rgba(99,99,99,1);
    color: rgba(99,99,99,1);
    transition: all 250ms linear;
    font-weight: 100;

    @media (min-width: 767px) {
      opacity: .7;
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
      &::placeholder{

      }
    }

    &:focus {
      color: rgba(99,99,99,1);

      &::placeholder {
        opacity: 0;
      }
    }
  }

  .animated-border{
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
    border-top: 1px solid rgba(99,99,99,1);
  }
</style>
