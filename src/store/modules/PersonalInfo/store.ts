import { PersonalInfoAction } from "./actions";
import { PersonalInfoMutations } from "./mutations";
import { PersonalInfoState } from "./state";

  
const PersonalInformationModule = {
    state: PersonalInfoState,
    mutations: PersonalInfoMutations,
    actions: PersonalInfoAction
    
}

export default PersonalInformationModule;