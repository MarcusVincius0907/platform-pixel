import { CheckoutAction } from './actions'
import { CheckoutMutations } from './mutations'
import { CheckoutState } from './state'

const CheckoutModule = {
  state: CheckoutState,
  mutations: CheckoutMutations,
  actions: CheckoutAction,
}

export default CheckoutModule
