import { AddressInfo } from "@/types/User";

interface PersonalInfoModuleModel {
   formAddressInfo: AddressInfo | null;
}
  
const PersonalInformationModule = {
    state: (): PersonalInfoModuleModel => ({ 
        formAddressInfo: null,
    }),
    mutations: { 
        setFormAddressInfo(state: PersonalInfoModuleModel , value: AddressInfo){
            state.formAddressInfo = value;
        }
    },
}

export default PersonalInformationModule;