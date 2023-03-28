import { CheckoutRequest } from '@/types/Checkout'
import ResponseDefault from '@/types/ResponseDefault'
import BaseService from './baseService'

export default class CheckoutService {
  private _baseService: BaseService = new BaseService()

  async makeCheckout(checkoutRequest: CheckoutRequest, cartId: string): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.post<ResponseDefault>(`/checkout/${cartId}`, checkoutRequest)
      return req.data
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex)
    }
  }
}
