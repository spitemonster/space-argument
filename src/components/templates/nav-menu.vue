<template>
  <ul class="nav-menu">
    <li class="selected" @click="setFocus">dashboard</li>
    <li v-if="isAdmin()" @click="setFocus">write brief</li>
    <li v-else @click="setFocus">briefs</li>
    <li v-if="isAdmin()" @click="setFocus">utilities</li>
    <li v-if="!isAdmin()" @click="setFocus">party</li>
    <li @click="logOut">logout</li>
  </ul>
</template>

<script>
import { bus } from '../../bus.js'

export default {
  name: 'nav-menu',
  data() {
    return {
    }
  },

  props: {
    type: ''
  },

  methods: {
    isAdmin() {
      //didn't work as a computed property
      return (this.type == 'Admin' ? true : false);
    },

    setFocus(e) {
      //nav menu focus etc
      bus.$emit('setFocus', e.target.textContent);
    },

    logOut() {
      firebase
        .auth()
        .signOut()
        .then(e => {
          this.$router.replace('login')
        })
    }
  },

  created() {
    bus.$on('setFocus', (data) => {
      //takes 'setFocus' data, parses it to a string, then finds matching view. straightforward.
      let target = data.toString();
      let links = document.getElementsByTagName('li');

      for (let i = 0; i < links.length; i++) {
        if (links[i].textContent == target) {
          links[i].classList.add('selected');
        } else {
          links[i].classList.remove('selected');
        }
      }
    });
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
  flex-wrap: wrap;

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
