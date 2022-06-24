import { createStore } from 'vuex'

const store = createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  state: {
    isSidebarMinimized: false,
    user: null,
    isAuthenticated: undefined
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
    }
  },
})

export default store;