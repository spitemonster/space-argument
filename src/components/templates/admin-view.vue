<template>
  <div class="admin">
    <brief-editor></brief-editor>
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.admin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.party {
  color: black;
}
</style>
