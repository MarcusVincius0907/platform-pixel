import { MyPixelAction } from "./actions";
import { MyPixelMutations } from "./mutations";
import { MyPixelState } from "./state";

const MyPixelModule = {
  state: MyPixelState,
  mutations: MyPixelMutations,
  actions: MyPixelAction,
};

export default MyPixelModule;
