<template lang="html">
  <div class="single-brief">
    <h3>{{ latestBrief.title }}</h3>
    <div v-html="latestBrief.content"></div>
  </div>
</template>

<script>
import db from '../../../assets/js/firebaseConfig.js'
import { bus } from '../../../bus.js'

export default {
  name: 'single-brief',

  data () {
    return {
      brief: {}
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
    latestBrief() {
      let latest = this.briefs[this.briefs.length - 1];

      return latest;
    }
  },

  methods: {

  },

  created() {
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
