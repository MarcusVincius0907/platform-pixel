import { MutationsType as MainMutationsType } from '@/store/mutations'
import { State } from '@/store/state'
import Notification from '@/types/Notification'
import { PaymentMethods } from '@/types/Payment'
import { ResponseStatus } from '@/types/ResponseDefault'
import { ActionContext } from 'vuex'
import { ActionTypes as NFTActionType } from '../NFT/actions'
import { MutationsType } from './mutations'
import { CheckoutModuleState } from './state'

export enum ActionTypes {
  MAKE_CHECKOUT_REQUEST = 'MAKE_CHECKOUT_REQUEST',
}

export const CheckoutAction = {
  async [ActionTypes.MAKE_CHECKOUT_REQUEST](context: ActionContext<CheckoutModuleState, State>) {
    if (context.state.checkoutRequest && context.rootState.CartModule.cart?._id) {
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, true)

      const CheckoutService = await import('@/services/checkoutService')

      const checkoutService = new CheckoutService.default()

      const resp = await checkoutService.makeCheckout(
        context.state.checkoutRequest,
        context.rootState.CartModule.cart?._id,
      )

      if (resp.status === ResponseStatus.OK) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: 'Sucesso',
          message: 'Pagamento realizado com sucesso!',
          color: 'success',
        } as Notification)

        context.commit(MutationsType.SET_CHECKOUT_RESPONSE, resp.payload)
      } else if (resp.status === ResponseStatus.INVALID_INFO) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: 'Erro',
          message: 'Dados inválidos',
          color: 'danger',
        } as Notification)
      } else {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: 'Erro',
          message: 'Erro inesperado, tente novamente mais tarde.',
          color: 'danger',
        } as Notification)
      }

      context.commit(MainMutationsType.SET_CUSTOM_LOADER, false)
    }
  },
}
