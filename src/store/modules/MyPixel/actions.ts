import { MutationsType as MainMutationsType } from '@/store/mutations'
import { State } from '@/store/state'
import { ResponseStatus } from '@/types/ResponseDefault'
import { ActionContext } from 'vuex'
import { MutationsType } from './mutations'
import { MyPixelModuleState } from './state'

export enum ActionTypes {
  GET_MY_PIXEL_LIST = 'GET_MY_PIXEL_LIST',
}

export const MyPixelAction = {
  async [ActionTypes.GET_MY_PIXEL_LIST](context: ActionContext<MyPixelModuleState, State>) {
    if (context.rootState.user?._id) {
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, true)

      const MyPixelService = await import('@/services/myPixelService')

      const myPixelService = new MyPixelService.default()

      const resp = await myPixelService.getAll(context.rootState.user?._id)

      if (resp.status === ResponseStatus.OK) {
        context.commit(MutationsType.SET_MY_PIXEL_LIST, [...resp.payload])
      }

      context.commit(MainMutationsType.SET_CUSTOM_LOADER, false)
    }
  },
}
