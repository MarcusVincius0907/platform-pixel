import Sortition from '@/types/Sortition'
import { SortitionModuleState } from './state'

export enum MutationsType {
  SET_FORM_DATA_SORTITION = 'SET_FORM_DATA_SORTITION',
  SET_SORTITION_LIST = 'SET_SORTITION_LIST',
  SET_SELECTED_SORTITION = 'SET_SELECTED_SORTITION',
}

export const SortitionMutations = {
  [MutationsType.SET_FORM_DATA_SORTITION](state: SortitionModuleState, value: Sortition) {
    state.formDataSortition = value
  },

  [MutationsType.SET_SORTITION_LIST](state: SortitionModuleState, value: Array<Sortition>) {
    state.sortitionList = [...value]
  },

  [MutationsType.SET_SELECTED_SORTITION](state: SortitionModuleState, value: Sortition) {
    state.selectedSortition = { ...value }
  },
}
