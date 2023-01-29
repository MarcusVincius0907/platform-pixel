import { AddressInfo, GeneralInfo } from "@/types/User";

export interface PersonalInfoModuleModel {
    formAddressInfo: AddressInfo | null;
    formGeneralInfo: GeneralInfo | null;
}

export const PersonalInfoState: PersonalInfoModuleModel = {
    formAddressInfo: null,
    formGeneralInfo: null
}