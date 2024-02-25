import { setCookie as setCookieLib } from 'typescript-cookie'

export { getCookie, removeCookie } from 'typescript-cookie';
export const setCookie = (key: string, value: string, options = {}) => setCookieLib(key, value, {
  expires: 2,
  sameSite: 'strict',
  secure: true,
  ...options,
})
