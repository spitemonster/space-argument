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
      <input id="briefWorld" type="text" placeholder="Current World" v-model="currentWorld" required>
      <input id="briefGoal" type="text" placeholder="Current Goal" v-model="currentGoal" required>
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
import { bus } from '../../../bus.js'
import pell from 'pell'

export default {
  name: 'brief-editor',

  props: {
    briefs: {},
    refs: {}
  },

  data () {
    return {
      posted: false,
      title: '',
      content: '',
      currentWorld: '',
      currentGoal: '',
      titleError: false,
      contentError: false
    }
  },

  mounted() {
    // Initialize pell on an HTMLElement
    pell.init({
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
  },

  methods: {
    success() {
      //if no problem with post, set this.posted to true and then after 3 seconds redirect to dashboard and reset this.posted to be used again
      this.posted = true;

      setTimeout(() => {
        bus.$emit('setFocus', 'dashboard');
        this.posted = false;
      }, 3000)
    },

    failure() {
      //if problem with post, stupidly figure out what the problem is, add error state and announce problem
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
      //as long as the post has content and a title, push the post to the list of posts in FB
      if (this.content != '' && this.title != '') {
        this.refs.briefs.push({
          title: this.title,
          content: this.content,
          currentWorld: this.currentWorld,
          currentGoal: this.currentGoal
        });
        this.success()
      } else {
        this.failure();
      }
    },
  },
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

.success {
  width: 200px;
  margin: 0 auto;
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
