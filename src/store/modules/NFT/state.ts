import { NFTIdList, NFTSummary } from "@/types/NFT";

export interface NFTModuleState {
  formDataNFT?: NFTSummary;
  nftSummaryList: Array<NFTSummary>;
  nftSummaryIdList: Array<NFTIdList>;
}

export const NFTState: NFTModuleState = {
  nftSummaryList: [],
  nftSummaryIdList: []
};
