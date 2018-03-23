<template lang="html">
  <div class="single-brief">
    <h3>{{ latestBrief.title }}</h3>
    <div v-html="latestBrief.content"></div>
  </div>
</template>

<script>
import { bus } from '../../../bus.js'

export default {
  name: 'single-brief',

  data () {
    return {
    }
  },

  props: {
    briefs: {}
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

<style lang="scss">
@import '../../../assets/css/_variables.scss';
</style>
