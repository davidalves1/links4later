import { signOut } from 'firebase/auth';

import { removeCookie } from '../services/cookies';
import { router } from '../routes';
import { auth } from '../services/firebase';
import { COOKIE_KEY_USER_ID } from './constants';

export const clearUserAndRedirect = () => {
  removeCookie(COOKIE_KEY_USER_ID);
  router.replace('/login');
}

export const doLogout = () => {
  signOut(auth).then(() => {
    clearUserAndRedirect();
  }).catch((err) => {
    console.error('🚀 ~ signOut ~ err:', err);
    // TODO: implement fail behaviour
    // throw Error(err);
  });
}
