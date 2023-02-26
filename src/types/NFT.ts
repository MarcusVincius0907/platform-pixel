

export default interface NFT{
  _id?: number;
  name: string;
  themes: string[];
  pixelQuantity: number;
  chunks?: Chunk[];
  chunkSize: number;
}

export interface FormDataNFT{
  _id?: string;
  name: string;
  pixelQuantity: number;
  themes: string;
}

export interface Chunk{
  _id?: number;
  position: number;
  pixels: Pixel[];
}

export interface Pixel{
  _id?: number;
  uuid: string;
  color: string;
  isAvailible: boolean;
}

export interface NFTMeasurements{
  NFTWidth: number;
  chunkWidth: number;
}

export interface NFTSummary{
  _id?: number;
  name: string;
  themes: string;
  idNFT?: string;
  pixelQuantity: number;
}