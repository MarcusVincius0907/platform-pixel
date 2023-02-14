import Notification from "@/types/Notification";
import { ResponseStatus } from "@/types/ResponseDefault";
import User from "@/types/User";
import { ActionContext, Store } from "vuex";
import { MutationsType } from "./mutations";
import { State } from "./state";

export enum ActionTypes {
  CHECK_USER_EXISTS = "CHECK_USER_EXISTS",
  CREATE_USER = "CREATE_USER",
}

export const mainAction = {
  async [ActionTypes.CHECK_USER_EXISTS](context: ActionContext<State, State>) {
    if (context.state.auth0User && context.state.auth0User.email) {
      context.commit(MutationsType.SET_CUSTOM_LOADER, true);

      const UserService = await import("@/services/userService");

      const userService = new UserService.default();

      const resp = await userService.getUserByEmail(
        context.state.auth0User?.email
      );

      if (resp.status === ResponseStatus.NOT_FOUND) {
        context.commit(MutationsType.SET_IS_NEW_USER, true);
      } else if (resp.status === ResponseStatus.OK) {
        context.commit(MutationsType.SET_IS_NEW_USER, false);
        context.commit(MutationsType.SET_USER, resp.payload);
      }

      context.commit(MutationsType.SET_CUSTOM_LOADER, false);
    } else {
      context.commit(MutationsType.SET_NOTIFICATION, {
        title: "Erro",
        message: "Usuário auth0 não encontrado",
        color: "danger",
      } as Notification);
    }
  },

  async [ActionTypes.CREATE_USER](
    context: ActionContext<State, State>,
    value: User
  ) {
    context.commit(MutationsType.SET_CUSTOM_LOADER, true);

    const UserService = await import("@/services/userService");

    const userService = new UserService.default();

    const resp = await userService.createUser(value);

    if (resp.status === ResponseStatus.INVALID_INFO) {
      context.commit(MutationsType.SET_NOTIFICATION, {
        title: "Erro",
        message: "As informações do usuário estão incorretas",
        color: "danger",
      } as Notification);
    } else if (resp.status === ResponseStatus.OK) {
      context.commit(MutationsType.SET_NOTIFICATION, {
        title: "Sucesso",
        message: "Usuário criado com sucesso",
        color: "primary",
      } as Notification);
      context.commit(MutationsType.SET_IS_NEW_USER, false);
      context.commit(MutationsType.SET_USER, resp.payload);
    }

    context.commit(MutationsType.SET_CUSTOM_LOADER, false);
  },
};
