import { AddressInfo, GeneralInfo } from "@/types/User";

export interface PersonalInfoModuleState {
  formAddressInfo: AddressInfo | null;
  formGeneralInfo: GeneralInfo | null;
}

export const PersonalInfoState: PersonalInfoModuleState = {
  formAddressInfo: null,
  formGeneralInfo: null,
};
