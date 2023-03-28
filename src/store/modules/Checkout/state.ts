import { CheckoutRequest, CheckoutResponse } from '@/types/Checkout'

export interface CheckoutModuleState {
  checkoutRequest: CheckoutRequest | null
  checkoutResponse: CheckoutResponse | null
}

export const CheckoutState: CheckoutModuleState = {
  checkoutRequest: null,
  checkoutResponse: null,
}
