import { Pixel } from "./NFT";
import { PaymentMethods } from "./Payment";

export interface CheckoutResponse {
  availablePixels: Array<Pixel>;
  unavailablePixels: Array<Pixel>;
}

export interface CheckoutRequest {
  paymentMethod: PaymentMethods;
}
