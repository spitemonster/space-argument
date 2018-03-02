<template>
  <div class="character">
    <p>
      {{ character }}
    </p>
    <p>
      {{ race }}
    </p>
    <p>
      {{ crap }}
    </p>
    <!-- <button type="button" name="button" @click="getUser">butts</button> -->
  </div>
</template>

<script>
import db from '../assets/js/firebaseConfig.js'

export default {
  name: 'Character',
  data () {
    return {
      character: '',
      race: '',
      crap: '',
      current:  firebase.auth().currentUser.uid
    }
  },
  computed: {

  },
  watch: {
    thing: function() {
      db.ref('players/' + this.current).on('value', (data) => {
        return data.val();
      })
    }
  },
  methods: {
  },
  mounted: function() {
    console.log(this.thing)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
