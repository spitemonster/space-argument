<template>
  <ul class="nav-menu">
    <li class="selected" @click="setFocus">dashboard</li>
    <li v-if="!isAdmin" @click="setFocus">briefs</li>
    <li v-if="isAdmin" @click="setFocus">write brief</li>
    <li @click="setFocus">party</li>
  </ul>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import { bus } from '../../bus.js'

export default {
  name: 'nav-menu',
  data() {
    return {
      current: firebase.auth().currentUser.uid
    }
  },

  firebase: function() {
    return {
      player: {
        source: db.ref('players/' + this.current),
        asObject: true
      }
    }
  },

  computed: {
    isAdmin() {
      let admin = false;

      if (this.player.type == 'Admin') {
        admin = true;
      }

      return admin;
    }
  },

  methods: {
    setFocus(e) {
      let links = document.getElementsByTagName('li');

      bus.$emit('setFocus', e.target.textContent);

      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('selected');
      }

      e.target.classList.add('selected');
    }
  },

  mounted() {
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
  .nav-menu {
    list-style: none;
    color: black;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    justify-content: center;

    li {
      display: inline-flex;
      justify-content: center;
      margin: 1rem 2rem;
      width: 100px;
      cursor: pointer;
    }
  }

  .selected {
    text-decoration: underline;
  }
</style>
