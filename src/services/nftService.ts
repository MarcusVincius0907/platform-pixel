import { NFTSummary } from "@/types/NFT";
import ResponseDefault from "@/types/ResponseDefault";
import BaseService from "./baseService";

export default class NFTService {
  private _baseService: BaseService = new BaseService();

  async getAllNFTs(): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.get<ResponseDefault>("/nft");
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }

  async getNFTSummaryIdList(): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.get<ResponseDefault>(
        "/nft/list/ids"
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }

  async getNFTMeasurements(nftId: string): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.get<ResponseDefault>(
        `/nft/measure/${nftId}`
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }

  async createNFT(nft: NFTSummary): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.post<ResponseDefault>(
        "/nft/create",
        nft
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }

  async updateNFT(nft: NFTSummary): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.put<ResponseDefault>(
        `/nft/${nft._id}`,
        nft
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }

  async deleteNFT(nftId: string): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.delete<ResponseDefault>(
        `/nft/${nftId}`
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }
}
