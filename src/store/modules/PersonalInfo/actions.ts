import { MutationsType as MainMutationsType } from "@/store/mutations";
import { State } from "@/store/state";
import Notification from "@/types/Notification";
import { ResponseStatus } from "@/types/ResponseDefault";
import { Store } from "vuex";
import { MutationsType } from "./mutations";
import { MutationsType as MainMutations } from "../../mutations";

export enum ActionTypes {
  REQUEST_ADDRESS_BY_ZIPCODE = "REQUEST_ADDRESS_BY_ZIPCODE",
}

export const PersonalInfoAction = {
  async [ActionTypes.REQUEST_ADDRESS_BY_ZIPCODE](
    context: Store<State>,
    value: string
  ) {
    context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);

    const UserService = await import("@/services/userService");

    const userService = new UserService.default();

    const resp = await userService.getAddressByZipcode(value);

    if (resp.status === ResponseStatus.OK) {
      context.commit(MainMutationsType.SET_NOTIFICATION, {
        title: "Sucesso",
        message: "Endereço encontrado",
        color: "primary",
      } as Notification);

      context.commit(MainMutations.SET_USER, { addressInfo: resp.payload });
    }

    context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
  },
};
