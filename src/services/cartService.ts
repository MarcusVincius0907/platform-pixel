import { Cart } from '@/types/Cart'
import ResponseDefault from '@/types/ResponseDefault'
import BaseService from './baseService'

export default class CartService {
  private _baseService: BaseService = new BaseService()

  async getByUserId(userId: string, sortitionId: string): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.get<ResponseDefault>(`/cart/user/${userId}/${sortitionId}`)
      return req.data
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex)
    }
  }

  async create(cart: Cart): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.post<ResponseDefault>('/cart/create', cart)
      return req.data
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex)
    }
  }

  async update(cart: Cart): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.put<ResponseDefault>(`/cart/${cart._id}`, cart)
      return req.data
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex)
    }
  }

  async delete(cartId: string): Promise<ResponseDefault> {
    try {
      const req = await this._baseService.http.delete<ResponseDefault>(`/cart/${cartId}`)
      return req.data
    } catch (ex) {
      return this._baseService.apiErrorTreatment(ex)
    }
  }
}
