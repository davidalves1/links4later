import { collection, onSnapshot, query, orderBy, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../services/firebase';
import { Link } from '../models/Link';
import { MUTATIONS, useLinkStore } from '../store';
import { clearUserAndRedirect } from '../services/logout';
import { getCookie } from '../services/cookies';
import { COOKIE_KEY_USER_ID } from '../services/constants';

const { commit } = useLinkStore;

const getUserId = () => {
  const encodedUserId = getCookie(COOKIE_KEY_USER_ID);

  if (!encodedUserId) {
    clearUserAndRedirect();
    throw Error('Invalid user');
  }

  try {
    return atob(encodedUserId)
  } catch (err) {
    console.error('Invalid user')
    clearUserAndRedirect();
    throw Error('Invalid user');
  }
}

export const getLinks = () => {
  const userId = getUserId();
  const linksRef = query(collection(db, `bookmarks/${userId}/links`), orderBy('createdAt', 'desc'))

  onSnapshot(linksRef, snapshot => {
    const links = snapshot.docs.map<Partial<Link>>(doc => doc.data())
    console.log('🚀 ~ getLinks ~ links:', links);

    commit(MUTATIONS.LOAD_LIKS, links)
  })
}

export const createLink = async (link: Omit<Link, '_id'>) => {
  const userId = getUserId();

  const data: Link = {
    '_id': crypto.randomUUID(),
    createdAt: Date.now(),
    ...link,
  }

  try {
    const linksDoc = doc(db, `bookmarks/${userId}/links`, data._id);

    if (!linksDoc) {
      clearUserAndRedirect();
      return;
    }

    await setDoc(linksDoc, data);
  } catch (err) {
    console.error('🚀 ~ createLink ~ err:', err);
  }
}

export const deleteLink = async (linkId: string) => {
  const userId = getUserId();

  try {
    await deleteDoc(doc(db, `bookmarks/${userId}/links`, linkId));
  } catch (err) {
    console.error('🚀 ~ deleteLink ~ err:', err);
  }
}
