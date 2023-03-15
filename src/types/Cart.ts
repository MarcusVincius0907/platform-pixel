import { Pixel } from "./NFT";

export interface Cart {
  _id?: string;
  pixels: Array<Pixel>;
  userId: string;
}
