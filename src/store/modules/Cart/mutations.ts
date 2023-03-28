import { Cart } from '@/types/Cart'
import { CartModuleState } from './state'

export enum MutationsType {
  SET_CART = 'SET_CART',
}

export const CartMutations = {
  [MutationsType.SET_CART](state: CartModuleState, value: Cart) {
    state.cart = value
  },
}
