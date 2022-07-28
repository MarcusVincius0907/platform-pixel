import { Auth0Plugin } from "@/auth";
import ResponseDefault from "@/types/ResponseDefault";
import BaseService from "./baseService";

export default class UserService{

  private _baseService: BaseService = new BaseService();

  constructor(private auth: Auth0Plugin = {} as Auth0Plugin) {}

  async getUser(): Promise<ResponseDefault> {
		try {
			const req = await this._baseService.http.get<ResponseDefault>('/user', await this._baseService.getHeaderAuth(this.auth))
			return req.data;
		}
		catch (ex) {
			return this._baseService.apiErrorTreatment(ex)
		}
	}
	
}