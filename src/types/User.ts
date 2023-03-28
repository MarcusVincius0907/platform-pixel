export default interface User extends GeneralInfo {
  _id?: string
  saldo?: number
  paymentInfo: PaymentInfo | null
  receiveInfo: ReceiveInfo | null
  addressInfo: AddressInfo | null
  accessType?: AccessType
}

export type AccessType = 'admin' | 'common'

export interface PaymentInfo {
  cards: Array<Card>
}

export interface Card {
  cardNumber: string
  cardName: string
  expirationDate: string
}

export interface ReceiveInfo {
  nickname: string
  bankInfo?: BankInfo
  pixKey?: string
  type: ReceiveInfoType
}

export enum ReceiveInfoType {
  BANK_TYPE = 'BANK_TYPE',
  PIX_TYPE = 'PIX_TYPE',
}
interface BankInfo {
  bankName: string
  agency: string
  account: string
}

export interface ReceiveInfoItem {
  nickname: string
  description?: string
}

export interface AddressInfo {
  zipcode: string
  street: string
  number: string
  district: string
  city: string
  state: string
  complement: string
}

export interface GeneralInfo {
  name: string
  email: string
  cpf: string
  cell: string
  birthDate: string | Date
}
