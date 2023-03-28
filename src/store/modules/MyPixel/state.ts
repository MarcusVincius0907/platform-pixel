import { MyPixelItem } from '@/types/MyPixel'

export interface MyPixelModuleState {
  myPixelList: Array<MyPixelItem>
}

export const MyPixelState: MyPixelModuleState = {
  myPixelList: [],
}
