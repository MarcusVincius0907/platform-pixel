import { Cart } from "@/types/Cart";

export interface CartModuleState {
  cart?: Cart;
}

export const CartState: CartModuleState = {
  cart: undefined,
};
