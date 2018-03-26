<template>
  <div class="admin">
    <brief-editor v-if="brief" :briefs="briefs" :refs="$firebaseRefs"></brief-editor>
    <section v-if="party">
      <party :party="team"></party>
    </section>
  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import { bus } from '../../bus.js'
import briefEditor from './admin/brief-editor.vue'
import party from './party.vue'

export default {
  name: 'admin-view',
  data () {
    return {
      current: null,
    }
  },

  props: {
    dashboard: true,
    brief: false,
    party: false
  },

  firebase: function() {
    return {
      briefs: {
        source: db.ref('briefs/')
      },
      team: db.ref('players/')
    }
  },

  components: {
    briefEditor,
    party
  },

  computed: {
  },

  methods: {
  },

  created() {
  },

  mounted() {
    // console.log(this.team);
  }
}
</script>

<style lang="scss" scoped>
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

section {
  width: 50%;
}
</style>
