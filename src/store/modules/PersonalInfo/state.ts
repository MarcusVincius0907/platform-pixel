import {
  AddressInfo,
  GeneralInfo,
  PaymentInfo,
  ReceiveInfo,
} from "@/types/User";

export interface PersonalInfoModuleState {
  formAddressInfo: AddressInfo | null;
  formGeneralInfo: GeneralInfo | null;
  formReceiveInfo: ReceiveInfo | null;
  formPaymentInfo: PaymentInfo | null;
}

export const PersonalInfoState: PersonalInfoModuleState = {
  formAddressInfo: null,
  formGeneralInfo: null,
  formReceiveInfo: null,
  formPaymentInfo: null,
};
