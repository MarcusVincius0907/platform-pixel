import { AddressInfo, GeneralInfo } from "@/types/User";

export interface PersonalInfoModuleModel {
   formAddressInfo: AddressInfo | null;
   formGeneralInfo: GeneralInfo | null;
}

export enum MutationsType{
    SET_FORM_ADDRESS_INFO = 'SET_FORM_ADDRESS_INFO',
    SET_FORM_GENERAL_INFO = 'SET_FORM_GENERAL_INFO'
}
  
const PersonalInformationModule = {
    state: (): PersonalInfoModuleModel => ({ 
        formAddressInfo: null,
        formGeneralInfo: null
    }),
    mutations: { 
        [MutationsType.SET_FORM_ADDRESS_INFO](state: PersonalInfoModuleModel , value: AddressInfo){
            state.formAddressInfo = value;
        },

        [MutationsType.SET_FORM_GENERAL_INFO](state: PersonalInfoModuleModel , value: GeneralInfo){
            state.formGeneralInfo = value;
        }
    },
}

export default PersonalInformationModule;