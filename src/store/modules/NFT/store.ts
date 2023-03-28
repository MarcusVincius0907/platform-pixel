import { NFTAction } from './actions'
import { NFTMutations } from './mutations'
import { NFTState } from './state'

const NFTModule = {
  state: NFTState,
  mutations: NFTMutations,
  actions: NFTAction,
}

export default NFTModule
