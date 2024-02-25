import { signInWithEmailAndPassword } from 'firebase/auth'

import { setCookie } from './cookies';
import { router } from '../routes';
import { auth } from './firebase';
import { COOKIE_KEY_USER_ID } from './constants';

interface User {
  email: string;
  password: string;
}

export const doLogin = (user: User) =>
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then(userCredential => {
      const { uid } = userCredential.user;
      setCookie(COOKIE_KEY_USER_ID, btoa(uid));
      router.replace('/');
    })
    .catch(error => {
      console.error('🚀 ~ login error:', error);
      throw error;
    });
