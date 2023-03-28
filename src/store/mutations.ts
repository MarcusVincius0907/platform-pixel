import { State } from './state'

export enum MutationsType {
  UPDATE_SIDEBAR_COLLPASED_STATE = 'UPDATE_SIDEBAR_COLLPASED_STATE',
  SET_USER = 'SET_USER',
  SET_AUTH_USER = 'SET_AUTH_USER',
  SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED',
  SET_IS_NEW_USER = 'SET_IS_NEW_USER',
  SET_CUSTOM_LOADER = 'SET_CUSTOM_LOADER',
  SET_NOTIFICATION = 'SET_NOTIFICATION',
}

export const mainMutations = {
  [MutationsType.UPDATE_SIDEBAR_COLLPASED_STATE](state: State, value) {
    state.isSidebarMinimized = value
  },

  [MutationsType.SET_USER](state: State, value) {
    state.user = value
  },

  [MutationsType.SET_AUTH_USER](state: State, value) {
    state.auth0User = value
  },

  [MutationsType.SET_IS_AUTHENTICATED](state: State, value) {
    state.isAuthenticated = value
  },

  [MutationsType.SET_IS_NEW_USER](state: State, value) {
    state.isNewUser = value
  },

  [MutationsType.SET_CUSTOM_LOADER](state: State, value) {
    state.customLoader = value
  },

  [MutationsType.SET_NOTIFICATION](state: State, value) {
    state.notification = value
  },
}
