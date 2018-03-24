<template lang="html">
  <div>
    <div id="characterName">
      <h1>{{ player.name }}</h1><h3>{{ player.species }}</h3>
    </div>
    <div id="healthBar" class="bar">
      {{ player.woundCurrent }} / {{ player.woundThresh }}
    </div>

    <div id="forceBar" class="bar" v-if="hasForce">
      {{ player.forceCommit }} / {{ player.forceAvail}}
    </div>

    <div id="encBar" class="bar">
      {{ encumberance }} / {{ player.encThresh }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'player-info',

  data() {
    return {

    }
  },

  computed: {
    encumberance() {
      let total = 0

      return total;
    }
  },

  props: {
    player: {},
    weapons: {},
    armor: {}
  },

  methods: {
    currentHealth() {
      return this.player.skills.astrogation - this.player.skills.athletics
    },

    hasForce() {
      return this.player.hasForce
    }
  },

  mounted() {
  }
}
</script>

<style lang="scss">
</style>
