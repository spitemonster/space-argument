<template>
  <div class="admin">
    <brief-editor v-if="brief"
                  :briefs="briefs"
                  :refs="$firebaseRefs"></brief-editor>
    <section v-if="dashboard">
      <party :isAdmin="isAdmin"></party>
      <h1 class="divider">Brief</h1>
      <single-brief :briefs="briefs" class="brief"></single-brief>
    </section>
    <admin-utilities v-if="util"></admin-utilities>
  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import { bus } from '../../bus.js'
import briefEditor from './admin/brief-editor.vue'
import party from './party.vue'
import adminUtilities from './admin/admin-utilities'
import singleBrief from './player/single-brief.vue'

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
    party: false,
    util: false,
    isAdmin: ''
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
    party,
    adminUtilities,
    singleBrief
  },

  computed: {
  },

  methods: {
  },

  created() {
  },

  mounted() {
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
  margin-top: 3rem;
}

.party {
  color: black;
}

.divider {
  width: 100%;
  border-bottom: 1px solid $black;
  margin-bottom: 2rem;
}

.brief {
  margin-bottom: 3rem;
}

section {
  @media (min-width: 767px) {
    width: 50%;
  }

  @media (max-width: 766px) {
    width: 80%;
  }
}
</style>
