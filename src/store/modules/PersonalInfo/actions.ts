import { MutationsType as MainMutationsType } from '@/store/mutations'
import { State } from '@/store/state'
import Notification from '@/types/Notification'
import { ResponseStatus } from '@/types/ResponseDefault'
import { ActionContext } from 'vuex'
import { MutationsType as MainMutations } from '../../mutations'
import { PersonalInfoModuleState } from './state'
import { ActionTypes as MainActionTypes } from '../../actions'

export enum ActionTypes {
  REQUEST_ADDRESS_BY_ZIPCODE = 'REQUEST_ADDRESS_BY_ZIPCODE',
  UPDATE_GENERA_INFO = 'UPDATE_GENERA_INFO',
  UPDATE_ADDRESS_INFO = 'UPDATE_ADDRESS_INFO',
  UPDATE_RECEIVE_INFO = 'UPDATE_RECEIVE_INFO',
  UPDATE_PAYMENT_INFO = 'UPDATE_PAYMENT_INFO',
  DELETE_RECEIVE_INFO = 'DELETE_RECEIVE_INFO',
  DELETE_PAYMENT_INFO = 'DELETE_PAYMENT_INFO',
}

export const PersonalInfoAction = {
  async [ActionTypes.REQUEST_ADDRESS_BY_ZIPCODE](
    context: ActionContext<PersonalInfoModuleState, State>,
    value: string,
  ) {
    context.commit(MainMutationsType.SET_CUSTOM_LOADER, true)

    const UserService = await import('@/services/userService')

    const userService = new UserService.default()

    const resp = await userService.getAddressByZipcode(value)

    if (resp.status === ResponseStatus.OK) {
      context.commit(MainMutationsType.SET_NOTIFICATION, {
        title: 'Sucesso',
        message: 'Endereço encontrado',
        color: 'primary',
      } as Notification)

      const user = context.rootState.user
      context.commit(MainMutations.SET_USER, {
        ...user,
        addressInfo: resp.payload,
      })
    }

    context.commit(MainMutationsType.SET_CUSTOM_LOADER, false)
  },

  async [ActionTypes.UPDATE_GENERA_INFO](context: ActionContext<PersonalInfoModuleState, State>) {
    const user = {
      ...context.rootState.user,
      ...context.state.formGeneralInfo,
    }

    context.commit(MainMutationsType.SET_USER, user)
    context.dispatch(MainActionTypes.UPDATE_USER)
  },

  async [ActionTypes.UPDATE_ADDRESS_INFO](context: ActionContext<PersonalInfoModuleState, State>) {
    const user = {
      ...context.rootState.user,
      addressInfo: context.state.formAddressInfo,
    }

    context.commit(MainMutationsType.SET_USER, user)
    context.dispatch(MainActionTypes.UPDATE_USER)
  },

  async [ActionTypes.UPDATE_RECEIVE_INFO](context: ActionContext<PersonalInfoModuleState, State>) {
    const user = {
      ...context.rootState.user,
      receiveInfo: context.state.formReceiveInfo,
    }

    context.commit(MainMutationsType.SET_USER, user)
    context.dispatch(MainActionTypes.UPDATE_USER)
  },

  async [ActionTypes.DELETE_RECEIVE_INFO](context: ActionContext<PersonalInfoModuleState, State>) {
    const user = {
      ...context.rootState.user,
      receiveInfo: null,
    }

    context.commit(MainMutationsType.SET_USER, user)
    context.dispatch(MainActionTypes.UPDATE_USER)
  },

  async [ActionTypes.UPDATE_PAYMENT_INFO](context: ActionContext<PersonalInfoModuleState, State>) {
    const user = {
      ...context.rootState.user,
      paymentInfo: context.state.formPaymentInfo,
    }

    context.commit(MainMutationsType.SET_USER, user)
    context.dispatch(MainActionTypes.UPDATE_USER)
  },

  async [ActionTypes.DELETE_PAYMENT_INFO](context: ActionContext<PersonalInfoModuleState, State>) {
    const user = {
      ...context.rootState.user,
      paymentInfo: null,
    }

    context.commit(MainMutationsType.SET_USER, user)
    context.dispatch(MainActionTypes.UPDATE_USER)
  },
}
