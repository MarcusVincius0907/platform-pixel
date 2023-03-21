import ResponseDefault from "@/types/ResponseDefault";
import BaseService from "./baseService";

export default class MyPixelService {
  private _baseService: BaseService = new BaseService();

  async getAll(userId: string) /* : Promise<ResponseDefault>  */ {
    try {
      const req = await this._baseService.http.get<ResponseDefault>(
        `/my-pixel/${userId}`
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }
}
