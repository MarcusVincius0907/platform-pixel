import { Pixel } from './NFT'

export interface Cart {
  _id?: string
  sortitionId: string
  pixels: Array<Pixel>
  userId: string
}
