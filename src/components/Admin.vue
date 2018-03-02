<template>
  <div class="character">
    <p>ADMIN PAGE, BITCH</p>
    <!-- <button type="button" name="button" @click="getUser">butts</button> -->
  </div>
</template>

<script>


export default {
  name: 'Character',
  data () {
    return {
      character: '',
      race: '',
      crap: ''
    }
  },
  computed: {
  },
  methods: {
    
  },
  created: function() {
      firebase.database().ref('players/' + firebase.auth().currentUser.uid).once('value', (data) => {
        let info = data.val();

        this.character = info.character;
        this.race = info.race;
        this.crap = info.crap;

        addDataListener();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
