import { NFTIdList, NFTSummary } from "@/types/NFT";
import { NFTModuleState } from "./state";

export enum MutationsType {
  SET_FORM_DATA_NFT = 'SET_FORM_DATA_NFT',
  SET_NFT_LIST = 'SET_NFT_LIST',
  SET_NFT_ID_LIST = 'SET_NFT_ID_LIST',
}

export const NFTMutations = {
  [MutationsType.SET_FORM_DATA_NFT](
    state: NFTModuleState,
    value: NFTSummary
  ) {
    state.formDataNFT = value;
  },

  [MutationsType.SET_NFT_LIST](
    state: NFTModuleState,
    value: Array<NFTSummary>
  ) {
    state.nftSummaryList = value;
  },

  [MutationsType.SET_NFT_ID_LIST](
    state: NFTModuleState,
    value: Array<NFTIdList>
  ) {
    state.nftSummaryIdList = value;
  },
};
