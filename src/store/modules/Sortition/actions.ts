import { MutationsType as MainMutationsType } from "@/store/mutations";
import { State } from "@/store/state";
import Notification from "@/types/Notification";
import { ResponseStatus } from "@/types/ResponseDefault";
import { ActionContext } from "vuex";
import { MutationsType } from "./mutations";
import { SortitionModuleState } from "./state";
import { ActionTypes as NFTActionType } from "../NFT/actions";

export enum ActionTypes {
  GET_SORTITION_LIST = "GET_SORTITION_LIST",
  GET_SORTITION_BY_ID = "GET_SORTITION_BY_ID",
  CREATE_SORTITION = "CREATE_SORTITION",
  UPDATE_SORTITION = "UPDATE_SORTITION",
  DELETE_SORTITION = "DELETE_SORTITION",
  DEFINE_SELECTED_SORTITION_RANDOMLY = "DEFINE_SELECTED_SORTITION_RANDOMLY",
}

export const SortitionAction = {
  async [ActionTypes.GET_SORTITION_LIST](
    context: ActionContext<SortitionModuleState, State>
  ) {
    context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);

    const SortitionService = await import("@/services/sortitionService");

    const sortitionService = new SortitionService.default();

    const resp = await sortitionService.getAll();

    if (resp.status === ResponseStatus.OK) {
      context.commit(MutationsType.SET_SORTITION_LIST, [...resp.payload]);
    }

    context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
  },

  async [ActionTypes.GET_SORTITION_BY_ID](
    context: ActionContext<SortitionModuleState, State>,
    sortitionId: string
  ) {
    context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);

    const SortitionService = await import("@/services/sortitionService");

    const sortitionService = new SortitionService.default();

    const resp = await sortitionService.getById(sortitionId);

    if (resp.status === ResponseStatus.OK) {
      context.commit(MutationsType.SET_SELECTED_SORTITION, resp.payload);
    }

    context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
  },

  async [ActionTypes.CREATE_SORTITION](
    context: ActionContext<SortitionModuleState, State>
  ) {
    if (context.state.formDataSortition) {
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);

      const SortitionService = await import("@/services/sortitionService");

      const sortitionService = new SortitionService.default();

      const resp = await sortitionService.create(
        context.state.formDataSortition
      );

      if (resp.status === ResponseStatus.OK) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Sucesso",
          message: "NFT criado!",
          color: "success",
        } as Notification);

        context.dispatch(ActionTypes.GET_SORTITION_LIST);
        context.dispatch(NFTActionType.GET_NFT_SUMMARY_ID_LIST);
      } else if (resp.status === ResponseStatus.INVALID_INFO) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Dados inválidos",
          color: "danger",
        } as Notification);
      } else {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Erro inesperado, tente novamente mais tarde.",
          color: "danger",
        } as Notification);
      }

      context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
    }
  },

  async [ActionTypes.UPDATE_SORTITION](
    context: ActionContext<SortitionModuleState, State>
  ) {
    if (context.state.formDataSortition) {
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);

      const SortitionService = await import("@/services/sortitionService");

      const sortitionService = new SortitionService.default();

      const resp = await sortitionService.update(
        context.state.formDataSortition
      );

      if (resp.status === ResponseStatus.OK) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Sucesso",
          message: "NFT atualizado!",
          color: "success",
        } as Notification);

        context.dispatch(ActionTypes.GET_SORTITION_LIST);
        context.dispatch(NFTActionType.GET_NFT_SUMMARY_ID_LIST);
      } else if (resp.status === ResponseStatus.INVALID_INFO) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Dados inválidos",
          color: "danger",
        } as Notification);
      } else {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Erro inesperado, tente novamente mais tarde.",
          color: "danger",
        } as Notification);
      }

      context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
    }
  },

  async [ActionTypes.DELETE_SORTITION](
    context: ActionContext<SortitionModuleState, State>
  ) {
    if (context.state.formDataSortition) {
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);

      const SortitionService = await import("@/services/sortitionService");

      const sortitionService = new SortitionService.default();

      const resp = await sortitionService.delete(
        context.state.formDataSortition._id ?? ""
      );

      if (resp.status === ResponseStatus.OK) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Sucesso",
          message: "NFT deletado!",
          color: "success",
        } as Notification);

        context.dispatch(ActionTypes.GET_SORTITION_LIST);
        context.dispatch(NFTActionType.GET_NFT_SUMMARY_ID_LIST);
      } else {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Erro inesperado, tente novamente mais tarde.",
          color: "danger",
        } as Notification);
      }

      context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
    }
  },

  async [ActionTypes.DEFINE_SELECTED_SORTITION_RANDOMLY](
    context: ActionContext<SortitionModuleState, State>
  ) {
    await context.dispatch(ActionTypes.GET_SORTITION_LIST);

    if (context.state.sortitionList.length > 0) {
      context.commit(
        MutationsType.SET_SELECTED_SORTITION,
        context.state.sortitionList[0]
      );
    }
  },
};
