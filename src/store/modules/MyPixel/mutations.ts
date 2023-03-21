import { MyPixelItem } from "@/types/MyPixel";
import { MyPixelModuleState } from "./state";

export enum MutationsType {
  SET_MY_PIXEL_LIST = "SET_MY_PIXEL_LIST",
}

export const MyPixelMutations = {
  [MutationsType.SET_MY_PIXEL_LIST](
    state: MyPixelModuleState,
    value: Array<MyPixelItem>
  ) {
    state.myPixelList = value;
  },
};
