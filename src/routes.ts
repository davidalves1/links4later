import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import { getCookie } from './services/cookies';
import { COOKIE_KEY_USER_ID } from './services/constants';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/login', name: 'Login', component: Login },
      {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter(_, __, next) {
          if (!!getCookie(COOKIE_KEY_USER_ID)) {
            next();
            return;
          }

          next('/login');
        }
      }
    ],
})
