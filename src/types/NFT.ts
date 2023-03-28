export interface NFT {
  _id?: string
  chunks: Chunk[]
  chunkSize: number
}

export interface Chunk {
  _id?: string
  position: number
  pixels: Pixel[]
}

export interface Pixel {
  _id?: string
  uuid: string
  color: string
  position: number
  chunkPosition: number
  isAvailible: boolean
}

export interface NFTSummary {
  _id?: string
  name: string
  themes: string
  idNFT?: string
  pixelQuantity: number
}

export interface NFTIdList {
  id: string
  name: string
  vinculated: boolean
}

export interface NFTMeasurements {
  NFTWidth: number
  chunkWidth: number
  themes: string
  nft: NFT
}

export interface NFTParam {
  nftId: string
  pixelSize: string
}

export interface PixelCordinates {
  uuid: string
  chunkPosition: number
  pixelPosition: number
}
