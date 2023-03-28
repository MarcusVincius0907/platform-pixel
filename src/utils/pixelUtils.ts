import { Pixel } from '@/types/NFT'

export function convertPixelArrToStringArr(arr: Array<Pixel>) {
  return arr.map((item) => item._id)
}
