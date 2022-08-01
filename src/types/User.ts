
export default interface User{
  name: string;
  email: string;
  cpf: string;
  cell: string;
  birthDate: string;
  saldo?: number;
  paymentInfo?: PaymentInfo;
  receiveInfo?: ReceiveInfo;
  addressInfo?: AddressInfo;
}

export interface PaymentInfo{
  cards: Array<Card>;
}

interface Card{
  cardNumber: string;
  cardName: string;
  expirationDate: string;
}

export interface ReceiveInfo{
  nickname: string;
  bankInfo?: BankInfo;
  pixKey?: string;

}
interface BankInfo{
  bankName: string;
  agency: string;
  account: string;
}

export interface AddressInfo{
  zipcode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  estate: string;
  complement: string;
}