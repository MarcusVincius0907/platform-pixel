import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import PersonalInformationModule,{ PersonalInfoModuleModel } from './modules/PersonalInfo'

export interface State {
  isSidebarMinimized: boolean;
  user: any;
  isAuthenticated: any;
  isNewUser: boolean;
  customLoader: boolean;
  PersonalInfo: PersonalInfoModuleModel;
}

export enum MutationsType{
  UPDATE_SIDEBAR_COLLPASED_STATE = 'UPDATE_SIDEBAR_COLLPASED_STATE',
  SET_USER = 'SET_USER',
  SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED',
  SET_IS_NEW_USER = 'SET_IS_NEW_USER',
  SET_CUSTOM_LOADER = 'SET_CUSTOM_LOADER'
} 

export const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
  strict: true, // process.env.NODE_ENV !== 'production',

  modules:{
    PersonalInfo: PersonalInformationModule
  },

  state: {
    isSidebarMinimized: false,
    user: null,
    isAuthenticated: undefined,
    isNewUser: false,
    customLoader: false
  } as State,

  mutations: {

    [MutationsType.UPDATE_SIDEBAR_COLLPASED_STATE](state, isSidebarMinimized) {
      state.isSidebarMinimized = isSidebarMinimized
    },

    [MutationsType.SET_USER](state, user) {
      state.user = user
    },

    [MutationsType.SET_IS_AUTHENTICATED](state, value){
      state.isAuthenticated = value
    },

    [MutationsType.SET_IS_NEW_USER](state, value){
      state.isNewUser = value
    },

    [MutationsType.SET_CUSTOM_LOADER](state, value){
      state.customLoader = value;
    }
  },
})

export default store;