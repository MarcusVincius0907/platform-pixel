import { AddressInfo, GeneralInfo } from "@/types/User";

interface PersonalInfoModuleModel {
   formAddressInfo: AddressInfo | null;
   formGeneralInfo: GeneralInfo | null;
}
  
const PersonalInformationModule = {
    state: (): PersonalInfoModuleModel => ({ 
        formAddressInfo: null,
        formGeneralInfo: null
    }),
    mutations: { 
        setFormAddressInfo(state: PersonalInfoModuleModel , value: AddressInfo){
            state.formAddressInfo = value;
        },

        setFormGeneralInfo(state: PersonalInfoModuleModel , value: GeneralInfo){
            state.formGeneralInfo = value;
        }
    },
}

export default PersonalInformationModule;