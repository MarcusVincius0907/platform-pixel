export default interface User extends GeneralInfo {
  saldo?: number;
  paymentInfo: PaymentInfo | null;
  receiveInfo: ReceiveInfo | null;
  addressInfo: AddressInfo | null;
}

export interface PaymentInfo {
  cards: Array<Card>;
}

interface Card {
  cardNumber: string;
  cardName: string;
  expirationDate: string;
}

export interface ReceiveInfo {
  nickname: string;
  bankInfo?: BankInfo;
  pixKey?: string;
}
interface BankInfo {
  bankName: string;
  agency: string;
  account: string;
}

export interface AddressInfo {
  zipcode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement: string;
}

export interface GeneralInfo {
  name: string;
  email: string;
  cpf: string;
  cell: string;
  birthDate: string;
}
