import { AddressInfo, GeneralInfo } from "@/types/User";
import { PersonalInfoModuleModel } from "./state";

export enum MutationsType{
    SET_FORM_ADDRESS_INFO = 'SET_FORM_ADDRESS_INFO',
    SET_FORM_GENERAL_INFO = 'SET_FORM_GENERAL_INFO',
}

export const PersonalInfoMutations = {
    [MutationsType.SET_FORM_ADDRESS_INFO](state: PersonalInfoModuleModel , value: AddressInfo){
        state.formAddressInfo = value;
    },

    [MutationsType.SET_FORM_GENERAL_INFO](state: PersonalInfoModuleModel , value: GeneralInfo){
        state.formGeneralInfo = value;
    },
}