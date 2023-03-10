import ResponseDefault from "@/types/ResponseDefault";
import Sortition from "@/types/Sortition";
import BaseService from "./baseService";

export default class SortitionService {
  private _baseService: BaseService = new BaseService();

  async getAll(): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.get<ResponseDefault>(
        "/sortition"
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }

  async getById(id: string): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.get<ResponseDefault>(
        `/sortition/${id}`
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }

  async create(sortition: Sortition): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.post<ResponseDefault>(
        "/sortition/create",
        sortition
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }

  async update(sortition: Sortition): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.put<ResponseDefault>(
        `/sortition/${sortition._id}`,
        sortition
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }

  async delete(sortitionId: string): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.delete<ResponseDefault>(
        `/sortition/${sortitionId}`
      );
      return req.data;
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex);
    }
  }
}
