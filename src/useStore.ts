import { createStore } from 'zustand/vanilla';

const useStore = createStore(() => ({
  links: [],
}))

export const {
  getState,
  setState,
  subscribe,
} = useStore;

