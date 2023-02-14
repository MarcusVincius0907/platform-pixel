import { AddressInfo, GeneralInfo } from "@/types/User";
import { PersonalInfoModuleState } from "./state";

export enum MutationsType{
    SET_FORM_ADDRESS_INFO = 'SET_FORM_ADDRESS_INFO',
    SET_FORM_GENERAL_INFO = 'SET_FORM_GENERAL_INFO',
}

export const PersonalInfoMutations = {
    [MutationsType.SET_FORM_ADDRESS_INFO](state: PersonalInfoModuleState , value: AddressInfo){
        state.formAddressInfo = value;
    },

    [MutationsType.SET_FORM_GENERAL_INFO](state: PersonalInfoModuleState , value: GeneralInfo){
        state.formGeneralInfo = value;
    },
}