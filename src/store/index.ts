import { createStore } from 'vuex'
import { State } from './state'
import MainStore from './store'

const store = createStore<State>(new MainStore())

export default store
