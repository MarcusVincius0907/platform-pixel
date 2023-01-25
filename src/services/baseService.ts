import axios, { AxiosInstance } from "axios"
import ResponseDefault from "@/types/ResponseDefault"
import { Auth0Plugin } from "@/auth"

import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import authConfig from '../../auth_config.json'



async function getAuthToken(){
  return createAuth0Client(authConfig).then(async (res) => {
   return  await res.getTokenSilently();
  }).catch(er => {
    console.log(er);
  })
}



export default class BaseService {
    public http: AxiosInstance;
    constructor() { 

      this.http = axios.create({
          baseURL: process.env.VUE_APP_API_URL_DEV
      })  

      this.http.interceptors.request.use(async (config) => {
        const token = await getAuthToken();
        config.headers['authorization'] = `Bearer ${token}`
        return config;
      }, (error) => {
        return Promise.reject(error);
      });

      
        
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