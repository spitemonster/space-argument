<template>
  <div class="admin">
    <brief-editor v-if="brief" :briefs="briefs" :refs="$firebaseRefs"></brief-editor>
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

  firebase: function() {
    return {
      briefs: {
        source: db.ref('briefs/')
      }
    }
  },

  components: {
    briefEditor,
  },

  computed: {
  },

  methods: {
  },

  created() {
  },

  mounted() {
    console.log(this.$firebaseRefs);
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
