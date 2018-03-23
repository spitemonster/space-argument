<template>
  <div class="admin">
    <brief-editor v-if="brief"></brief-editor>
  </div>
</template>

<script>
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

  computed: {
  },

  methods: {
  },

  created() {
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
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
