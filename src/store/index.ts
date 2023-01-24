import { createStore } from 'vuex'

const store = createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  state: {
    isSidebarMinimized: false,
    user: null,
    isAuthenticated: undefined,
    isNewUser: false,
    customLoader: false
  },
  mutations: {
    updateSidebarCollapsedState(state, isSidebarMinimized) {
      state.isSidebarMinimized = isSidebarMinimized
    },
    setUser(state, user) {
      state.user = user
    },
    setIsAuthenticated(state, value){
      state.isAuthenticated = value
    },
    setIsNewUser(state, value){
      state.isNewUser = value
    },

    setCustomLoader(state, value){
      state.customLoader = value;
    }
  },
})

export default store;