<template>
  <div id="inventory">
    <ul>
      <li v-for="shooster in this.shoosters">
        {{ shooster.name }}
        <ul>
          <li>{{ shooster.damage }}</li>
          <li>{{ shooster.crit }}</li>
          <li>{{ shooster.encumberance }}</li>
        </ul>
      </li>
    </ul>
    <ul>
      <li v-for="arm in this.armor">
        {{ arm.name }}
        <ul>
          <li>{{ arm.defense }}</li>
          <li>{{ arm.soak }}</li>
          <li>{{ arm.encumberance }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { bus } from '../../../bus.js'

export default {
  name: 'player-inventory',
  data() {
    return {
      inventory: false
    }
  },

  props: {
    shoosters: {},
    armor: {}
  },

  computed: {
  },

  created() {
  }
}
</script>

<style lang="scss">
@import '../../../assets/css/_variables.scss';

#inventory {
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
