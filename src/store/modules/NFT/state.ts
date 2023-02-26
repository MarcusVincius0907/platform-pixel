import { FormDataNFT, NFTSummary } from "@/types/NFT";

export interface NFTModuleState {
  formDataNFT?: FormDataNFT;
  nftSummaryList: Array<NFTSummary>;
}

export const NFTState: NFTModuleState = {
  nftSummaryList: []
};
