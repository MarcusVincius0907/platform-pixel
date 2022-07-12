export default interface Sortition {
  id?: number;
  themes?: string;
  name: string;
  date: Date;
  idNFT: string;
  pixelsAvailable: number;
  reward: string;
  status: boolean;
}