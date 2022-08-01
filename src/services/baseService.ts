import axios, { AxiosInstance } from "axios"
import ResponseDefault from "@/types/ResponseDefault"
import { Auth0Plugin } from "@/auth"

export default class BaseService {
    public http: AxiosInstance
    constructor() { 
        this.http = axios.create({
            baseURL: process.env.VUE_APP_API_URL_DEV
        })    
    }

    public async getHeaderAuth(auth: Auth0Plugin) {
      const token: string = (auth != null ? await auth.getTokenSilently() : null)
      return { headers: { authorization: `Bearer ${token}` } }
    }

    public apiErrorTreatment(exception: any): ResponseDefault {
      console.log(exception);
      if(exception?.response?.data) {
        return exception.response.data as ResponseDefault
      } else {
        return new ResponseDefault(
          exception.response?.status,
          exception.message,
          exception.payload,
        )
      }
    }
}