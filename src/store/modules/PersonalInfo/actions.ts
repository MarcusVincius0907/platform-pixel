import { MutationsType as MainMutationsType } from "@/store/mutations";
import { State } from "@/store/state";
import Notification from "@/types/Notification";
import { ResponseStatus } from "@/types/ResponseDefault";
import { ActionContext } from "vuex";
import { MutationsType as MainMutations } from "../../mutations";
import { PersonalInfoModuleState } from "./state";

export enum ActionTypes {
  REQUEST_ADDRESS_BY_ZIPCODE = "REQUEST_ADDRESS_BY_ZIPCODE",
}

export const PersonalInfoAction = {
  async [ActionTypes.REQUEST_ADDRESS_BY_ZIPCODE](
    context: ActionContext<PersonalInfoModuleState, State>,
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

      const user = context.rootState.user;
      context.commit(MainMutations.SET_USER, {
        ...user,
        addressInfo: resp.payload,
      });
    }

    context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
  },
};
