import { CheckoutRequest, CheckoutResponse } from "@/types/Checkout";
import { CheckoutModuleState } from "./state";

export enum MutationsType {
  SET_CHECKOUT_RESPONSE = "SET_CHECKOUT_RESPONSE",
  SET_CHECKOUT_REQUEST = "SET_CHECKOUT_REQUEST",
}

export const CheckoutMutations = {
  [MutationsType.SET_CHECKOUT_REQUEST](
    state: CheckoutModuleState,
    value: CheckoutRequest
  ) {
    state.checkoutRequest = value;
  },

  [MutationsType.SET_CHECKOUT_RESPONSE](
    state: CheckoutModuleState,
    value: CheckoutResponse
  ) {
    state.checkoutResponse = value;
  },
};
