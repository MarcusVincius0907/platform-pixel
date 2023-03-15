import { MutationsType as MainMutationsType } from "@/store/mutations";
import { State } from "@/store/state";
import Notification from "@/types/Notification";
import { ResponseStatus } from "@/types/ResponseDefault";
import { ActionContext } from "vuex";
import { MutationsType } from "./mutations";
import { CartModuleState } from "./state";
import { ActionTypes as NFTActionType } from "../NFT/actions";
import { Cart } from "@/types/Cart";
import { Pixel } from "@/types/NFT";

export enum ActionTypes {
  GET_CART = "GET_CART",
  CREATE_CART = "CREATE_CART",
  UPDATE_CART = "UPDATE_CART",
  DELET_CART = "DELETE_CART",
}

export const CartAction = {
  async [ActionTypes.GET_CART](context: ActionContext<CartModuleState, State>) {
    const CartService = await import("@/services/cartService");

    const cartService = new CartService.default();

    const userId = context.rootState.user?._id;

    const resp = await cartService.getByUserId(userId ?? "");

    if (resp.status === ResponseStatus.OK) {
      context.commit(MutationsType.SET_CART, resp.payload);
    } else if (resp.status === ResponseStatus.NOT_FOUND) {
      context.dispatch(ActionTypes.CREATE_CART);
    }
  },

  async [ActionTypes.CREATE_CART](
    context: ActionContext<CartModuleState, State>
  ) {
    const CartService = await import("@/services/cartService");

    const cartService = new CartService.default();

    const newCart: Cart = {
      pixels: [] as Array<Pixel>,
      userId: context.rootState.user?._id ?? "",
    };

    const resp = await cartService.create(newCart);

    if (resp.status === ResponseStatus.OK) {
      context.dispatch(ActionTypes.GET_CART);
    } else {
      console.error("Cart error", resp);
    }
  },

  async [ActionTypes.UPDATE_CART](
    context: ActionContext<CartModuleState, State>,
    pixels: Array<Pixel>
  ) {
    const CartService = await import("@/services/cartService");

    const cartService = new CartService.default();

    const newCart: Cart = {
      ...context.state.cart,
      pixels,
      userId: context.rootState.user?._id ?? "",
    };

    const resp = await cartService.update(newCart);

    if (resp.status === ResponseStatus.OK) {
      context.dispatch(ActionTypes.GET_CART);
    } else {
      console.error("Cart error", resp);
    }
  },

  async [ActionTypes.DELET_CART](
    context: ActionContext<CartModuleState, State>
  ) {
    const CartService = await import("@/services/cartService");

    const cartService = new CartService.default();

    const resp = await cartService.delete(context.state.cart?._id ?? "");

    if (resp.status === ResponseStatus.OK) {
      context.dispatch(ActionTypes.GET_CART);
    } else {
      console.error("Cart error", resp);
    }
  },
};
