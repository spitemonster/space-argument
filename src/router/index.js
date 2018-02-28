import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Character from '@/components/Character'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/character',
      name: 'Character',
      component: Character
    }
  ]
})
