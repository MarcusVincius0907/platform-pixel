import axios, { AxiosInstance } from 'axios'
import ResponseDefault from '@/types/ResponseDefault'
import createAuth0Client from '@auth0/auth0-spa-js'
import authConfig from '../../auth_config.json'
import { useAuth as auth } from '@/auth/config'

export default class BaseService {
  public http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
    })

    this.http.interceptors.request.use(
      async (config) => {
        const token = await auth.getTokenSilently()
        config.headers['authorization'] = `Bearer ${token}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  public apiErrorTreatment(exception: any): ResponseDefault {
    console.log(exception)
    if (exception?.response?.data) {
      return exception.response.data as ResponseDefault
    } else {
      return new ResponseDefault(exception.response?.status, exception.message, exception.payload)
    }
  }
}
