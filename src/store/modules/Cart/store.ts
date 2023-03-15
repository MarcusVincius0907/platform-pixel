import { CartAction } from "./actions";
import { CartMutations } from "./mutations";
import { CartState } from "./state";

const CartModule = {
  state: CartState,
  mutations: CartMutations,
  actions: CartAction,
};

export default CartModule;
