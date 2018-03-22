<template>
  <div class="admin">
    <brief-editor v-if="brief"></brief-editor>
  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import { bus } from '../../bus.js'
import briefEditor from './admin/brief-editor.vue'

export default {
  name: 'admin-view',
  data () {
    return {
    }
  },

  props: {
    dashboard: false,
    brief: false,
    party: false
  },

  components: {
    briefEditor,
  },

  firebase: function() {
    return {
      players: db.ref('players/')
    }
  },

  computed: {
  },

  methods: {
  },

  created() {
    console.log(this.dashboard);
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.admin {
  background: $forceBlue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.party {
  color: black;
}
</style>
