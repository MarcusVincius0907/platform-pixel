

export default interface NFT{
  _id?: number;
  name: string;
  themes: string[];
  chunks?: Chunk[];
  chunkSize: number;
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