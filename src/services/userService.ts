import { Auth0Plugin } from "@/auth";
import ResponseDefault from "@/types/ResponseDefault";
import User from "@/types/User";
import BaseService from "./baseService";

export default class UserService{

   private _baseService: BaseService = new BaseService();

   constructor(private auth: Auth0Plugin = {} as Auth0Plugin) {}

   async getUserByEmail(email: string): Promise<ResponseDefault> {
		try {
			const req = await this._baseService.http.put<ResponseDefault>('/user/email', { email }, await this._baseService.getHeaderAuth(this.auth))
			return req.data;
		}
		catch (ex) {
			return this._baseService.apiErrorTreatment(ex)
		}
	}

	async createUser(user: User): Promise<ResponseDefault>{
		try {
			const req = await this._baseService.http.post<ResponseDefault>('/user/create', user , await this._baseService.getHeaderAuth(this.auth))
			return req.data;
		}
		catch (ex) {
			return this._baseService.apiErrorTreatment(ex)
		}
	}
	
}