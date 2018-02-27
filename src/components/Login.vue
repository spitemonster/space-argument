<template>
  <div class="login">
    <form class="login">
      <input type="text" placeholder="email"></input>
      <input type="password" placeholder="password"></input>
      <button type="button" @click="db">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  methods: {
    db () {
      console.log(firebase.database());
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
