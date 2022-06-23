import { createStore } from 'vuex'

const store = createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  state: {
    isSidebarMinimized: false,
    userName: 'Vasili S',
    isAuthenticated: undefined
  },
  mutations: {
    updateSidebarCollapsedState(state, isSidebarMinimized) {
      state.isSidebarMinimized = isSidebarMinimized
    },
    changeUserName(state, newUserName) {
      state.userName = newUserName
    },
    setIsAuthenticated(state, value){
      state.isAuthenticated = value
    }
  },
})

export default store;