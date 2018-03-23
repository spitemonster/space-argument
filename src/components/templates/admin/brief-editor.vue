<template lang="html">
  <div class="editorContainer">
    <div class="error" id="title" v-if="titleError">
      You need to enter a title for your post.
    </div>
    <div class="error" id="content" v-if="contentError">
      You need to enter content for your post.
    </div>
    <div class="briefEditor" v-if="!posted">
      <input id="briefTitle" type="text" placeholder="title" v-model="title" required>
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
      content: '',
      titleError: false,
      contentError: false
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
        bus.$emit('setFocus', 'dashboard');
        this.posted = false;
      }, 3000)
    },

    failure() {
      document.getElementById('briefTitle').classList.add('invalid');
      document.getElementById('editor').classList.add('invalid');

      if (this.content == '') {
        this.contentError = true;
      } else if (this.title == '') {
        this.titleError = true;
      }

      setTimeout(() => {
        document.getElementById('briefTitle').classList.remove('invalid');
        document.getElementById('editor').classList.remove('invalid');
        this.titleError = false;
        this.contentError = false;
      }, 3000)
    },

    post() {
      if (this.content != '' && this.title != '') {
        this.$firebaseRefs.briefs.push({
          title: this.title,
          content: this.content
        });
        this.success()
      } else {
        this.failure();
      }
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
@import '../../../assets/css/_variables.scss';

.editorContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
}

#editor {
  margin: 2rem auto;
  border: 1px solid black;
  height: 300px;
}

#postButton {
  height: 40px;
  width: 120px;
  font-size: 1rem;
}

.invalid {
  border-color: $healthRed !important;
  animation: 250ms once shake;
  animation-duration: 250ms;
  animation-name: shake;
  // transform: translateX(-25%);
  transition: all 100ms linear;
}

.error {
  width: 400px;
  text-align: center;
  align-self: center;
  border: 1px solid red;
  padding: 1rem;
}

@keyframes shake {
  0% {
    transform: translateX(-25%);
  }
  20% {
    transform: translateX(25%);
  }
  40% {
    transform: translateX(-12.5%);
  }
  60%  {
    transform: translateX(12.5%);
  }
  80% {
    transform: translateX(-6.25%);
  }
  99% {
    transform: translateX(6.25%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
