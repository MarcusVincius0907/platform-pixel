import { SortitionAction } from "./actions";
import { SortitionMutations } from "./mutations";
import { SortitionState } from "./state";

  
const SortitionModule = {
    state: SortitionState,
    mutations: SortitionMutations,
    actions: SortitionAction
}

export default SortitionModule;