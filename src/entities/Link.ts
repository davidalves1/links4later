import { collection, onSnapshot, query, orderBy, doc, setDoc } from 'firebase/firestore'
import { db, auth } from '../services/firebase';
import { Link } from '../models/Link';
import { setState, getState } from '../useStore';
import { clearUserAndRedirect } from '../services/logout';
import { getCookie } from '../services/cookies';
import { COOKIE_KEY_USER_ID } from '../services/constants';

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

    setState({ links })
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

    return data;
  } catch (err) {
    console.error('🚀 ~ createLink ~ err:', err);
  }
}
