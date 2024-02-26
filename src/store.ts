import { reactive } from 'vue';

import { Link } from './models/Link';

interface State {
  [key: string]: any;
}

interface StoreArgs {
  state: State;
  mutations: {
    [key: string]: (state: State, ...args: any[]) => void
  }
}

export enum MUTATIONS {
  'LOAD_LINKS' = 'loadLinks',
  'ADD_LINK' = 'addLink',
  'DELETE_LINK' = 'deleteLink',
  'SET_LOADING' = 'setLoading',
}

function createStore({ state, mutations }: StoreArgs) {
  return {
    state: reactive(state),
    commit(key: string, ...args: any[]) {
      mutations[key](state, ...args);
    },
  };
}

const state = reactive({ links: [], loading: false })

export const useLinkStore = createStore({
  state,
  mutations: {
    loadLinks(state, links) {
      state.links = links as Link[];
    },
    addLink(state, link: Link) {
      state.links = [link, ...state.links];
    },
    deleteLink(state, id: string) {
      state.links = (state.links || []).filter((link: Link) => link._id !== id);
    },
    setLoading(state, status: boolean) {
      state.loading = status;
    }
  },
});
