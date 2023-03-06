import { MutationsType as MainMutationsType } from "@/store/mutations";
import { State } from "@/store/state";
import Notification from "@/types/Notification";
import { ResponseStatus } from "@/types/ResponseDefault";
import { ActionContext } from "vuex";
import { MutationsType } from "./mutations";
import { NFTModuleState } from "./state";

export enum ActionTypes {
  GET_NFT_LIST = "GET_NFT_SUMMARY_LIST",
  CREATE_NFT = "CREATE_NFT",
  UPDATE_NFT = "UPDATE_NFT",
  DELETE_NFT = "DELETE_NFT"
}

export const NFTAction = {
  async [ActionTypes.GET_NFT_LIST](
    context: ActionContext<NFTModuleState, State>
  ) {
    context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);

    const NFTService = await import("@/services/nftService");

    const nftService = new NFTService.default();

    const resp = await nftService.getAllNFTs();

    if (resp.status === ResponseStatus.OK) {
      const nftSummaryList = context.state.nftSummaryList;
      context.commit(MutationsType.SET_NFT_LIST, [...resp.payload]);
    }

    context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
  },

  async [ActionTypes.CREATE_NFT](
    context: ActionContext<NFTModuleState, State>
  ) {
    if(context.state.formDataNFT){
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);
  
      const NFTService = await import("@/services/nftService");
  
      const nftService = new NFTService.default();
  
      const resp = await nftService.createNFT(context.state.formDataNFT);
  
      if (resp.status === ResponseStatus.OK) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Sucesso",
          message: "NFT criado!",
          color: "success",
        } as Notification);

        context.dispatch(ActionTypes.GET_NFT_LIST);
      } else if(resp.status === ResponseStatus.INVALID_INFO){
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Dados inválidos",
          color: "danger",
        } as Notification);
      }else {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Erro inesperado, tente novamente mais tarde.",
          color: "danger",
        } as Notification);
      }
  
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
    }
  },

  async [ActionTypes.UPDATE_NFT](
    context: ActionContext<NFTModuleState, State>
  ) {
    if(context.state.formDataNFT){
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);
  
      const NFTService = await import("@/services/nftService");
  
      const nftService = new NFTService.default();
  
      const resp = await nftService.updateNFT(context.state.formDataNFT);
  
      if (resp.status === ResponseStatus.OK) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Sucesso",
          message: "NFT atualizado!",
          color: "success",
        } as Notification);

        context.dispatch(ActionTypes.GET_NFT_LIST);
      } else if(resp.status === ResponseStatus.INVALID_INFO){
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Dados inválidos",
          color: "danger",
        } as Notification);
      }else {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Erro inesperado, tente novamente mais tarde.",
          color: "danger",
        } as Notification);
      }
  
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
    }
  },

  async [ActionTypes.DELETE_NFT](
    context: ActionContext<NFTModuleState, State>
  ) {
    if(context.state.formDataNFT){
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, true);
  
      const NFTService = await import("@/services/nftService");
  
      const nftService = new NFTService.default();
  
      const resp = await nftService.deleteNFT(context.state.formDataNFT._id ?? "");
  
      if (resp.status === ResponseStatus.OK) {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Sucesso",
          message: "NFT deletado!",
          color: "success",
        } as Notification);

        context.dispatch(ActionTypes.GET_NFT_LIST);
      }else {
        context.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Erro",
          message: "Erro inesperado, tente novamente mais tarde.",
          color: "danger",
        } as Notification);
      }
  
      context.commit(MainMutationsType.SET_CUSTOM_LOADER, false);
    }
  },

  
};
