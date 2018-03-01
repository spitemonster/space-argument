import Vue from 'vue'
import Router from 'vue-router'

require('firebase')
import firebaseui from 'firebaseui'

import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Character from '@/components/Character'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/character'
    },
    {
      path: '/login',
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
      component: Character,
      meta: {
        requiresAuth: true
      }
    }
    // {
    //   path: '/dungeonmaster',
    //   name: 'DungeonMaster',
    //   component: DugneonMaster,
    //   meta: {
    //     requiresAuth: true,
    //     requiresDM: true
    //   }
    // }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('character')
  else next()
});

export default router
