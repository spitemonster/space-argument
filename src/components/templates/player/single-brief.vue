<template lang="html">
  <div class="single-brief" v-if="showBrief">
    <h3 class="title">{{ latestBrief.title }}</h3>
    <h4 class="current">Current World: {{ latestBrief.currentWorld }}</h4>
    <h4 class="current">Current Goal: {{ latestBrief.currentGoal }}</h4>
    <div class="content" v-html="latestBrief.content"></div>
  </div>
</template>

<script>
import { bus } from '../../../bus.js'

export default {
  name: 'single-brief',

  props: {
    briefs: {},
  },

  data () {
    return {
      showBrief: true,
    }
  },

  computed: {
    latestBrief() {
      //because this references itself it throws an error, not sure how to correct, oh well
      return this.briefs[this.briefs.length - 1];
    }
  },
}
</script>

<style lang="scss">
@import '../../../assets/css/_variables.scss';

.title,
.current {
  margin-bottom: .5rem;
}

.content {
  margin-top: 1rem;
}
</style>
