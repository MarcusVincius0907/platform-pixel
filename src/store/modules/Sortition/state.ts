import Sortition from '@/types/Sortition'

export interface SortitionModuleState {
  formDataSortition?: Sortition
  sortitionList: Array<Sortition>
  selectedSortition?: Sortition
}

export const SortitionState: SortitionModuleState = {
  sortitionList: [],
}
