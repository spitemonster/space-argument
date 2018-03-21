<template lang="html">
  <div>
    <div class="editor" v-if="!posted">
      <input type="text" placeholder="Title" v-model="title" />
      <textarea id="brief__content" placeholder="Content" v-model="content" />
      <button type="button" name="post" @click="post">POST</button>
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
    },

    post() {
      let brief = {
        title: this.title,
        content: this.content
      }

      let briefId = this.briefs.length;
      db.ref('briefs/' + briefId).set(brief);

      this.success()
    }
  }
}
</script>

<style lang="scss">
  div {
    width: 100%;
  }

  .editor {
    height: 600px;
    width: 50%;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input,
    textarea {
      width: 100%;
      font-size: 1rem;
      font-weight: 100;

      &::placeholder {
        text-transform: uppercase;
      }

      &:focus {
        opacity: 1;

        &::placeholder {
          opacity: 0;
        }
      }
    }

    textarea {
      height: 1.5rem;
      background: none;
      margin-top: 3rem;
      border: none;
      border-bottom: 1px solid black;
      transition: all 250ms linear;
      resize: none;
      opacity: .5;

      &:focus,
      &:valid {
        height: 400px;
        border: 1px solid black;
      }

      &:invalid {
        height: 1.5rem;
      }
    }

    button {
      width: 100px;
      height: 40px;
      font-size: 1rem;
      margin-top: 1rem;
      align-self: flex-start;
    }
  }
</style>
