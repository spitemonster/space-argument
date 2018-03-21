<template lang="html">
  <div class="single-brief">
    <h3>{{ latestBrief.title }}</h3>
    <p>{{ latestBrief.content }}</p>
  </div>
</template>

<script>
import db from '../../../assets/js/firebaseConfig.js'
import { bus } from '../../../bus.js'

export default {
  name: 'single-brief',

  data () {
    return {

    }
  },

  firebase: function() {
    return {
      briefs: {
        source: db.ref('briefs/')
      }
    }
  },

  computed: {
    whichBrief() {
      return this.briefs.length - 1;
    },

    latestBrief() {
      let latest = this.briefs[this.whichBrief];

      let brief = {
        title: latest.title,
        content: latest.content
      }

      return brief;
    }
  },

  methods: {

  },

  mounted() {

    // console.log(brief);
  }
}
</script>

<style lang="css" scoped>
  .single-brief {
    position: relative;
    color: black !important;
    margin-top: 5rem;
  }
</style>
