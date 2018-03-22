<template lang="html">
  <div class="editorContainer">
    <div class="briefEditor" v-if="!posted">
      <input id="briefTitle" type="text" placeholder="title" v-model="title">
      <div id="editor">
      </div>
      <button type="button" name="post" id="postButton" @click="post">POST</button>
    </div>
    <div class="success" v-if="posted">
      <h3>Success</h3>
      <p>Brief successfully posted. Redirecting.</p>
    </div>
  </div>
</template>

<script>
import db from '../../../assets/js/firebaseConfig.js'
import { bus } from '../../../bus.js'
import pell from 'pell'

export default {
  name: 'brief-editor',

  data () {
    return {
      posted: false,
      title: '',
      content: ''
    }
  },

  firebase: function() {
    return {
      briefs: {
        source: db.ref('briefs/')
      }
    }
  },

  computed: {
  },

  methods: {
    success() {
      this.posted = true;

      setTimeout(() => {
        bus.$emit('writeBrief');
        this.posted = false;
      }, 3000)
    },

    post() {
      this.$firebaseRefs.briefs.push({
        title: this.title,
        content: this.content
      });

      this.success()
    },

    editorFunctions() {
    }
  },
  mounted() {
    // Initialize pell on an HTMLElement
    pell.init({
      // <HTMLElement>, required
      element: document.getElementById('editor'),
      onChange: html => {
        this.content = html;
      },
      defaultParagraphSeparator: 'p',
      styleWithCSS: false,
      actions: [
        'bold',
        {
          name: 'custom',
          icon: 'C',
          title: 'Custom Action',
          result: () => console.log('Do something!')
        },
        'underline'
      ],
      classes: {
        actionbar: 'pell-actionbar',
        button: 'pell-button',
        content: 'pell-content',
        selected: 'pell-button-selected'
        }
    })
  }
}
</script>

<style lang="scss">
  @import '../../../../node_modules/pell/src/pell';

  .editorContainer {
    width: 100%;
    height: 100%;
  }

  .briefEditor {
    position: relative;
    margin: 0 auto;
    height: 100%;

    @media (min-width: 960px) {
      width: 50%;
    }

    @media (max-width: 959px) {
      width: 80%;
    }
  }

  #briefTitle {
    width: 100%;
    margin: 2rem auto 0;
    font-size: 1rem;
  }

  #editor {
    margin: 2rem auto;
    border: 1px solid black;
    height: 300px
  }

  #postButton {
    height: 40px;
    width: 120px;
    font-size: 1rem;
  }
</style>
