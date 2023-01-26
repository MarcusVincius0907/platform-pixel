import Pixel, {PixelsKey} from '@/types/Pixel';

interface PieceItem {
  id: string;
  color: string;
  piece: string;
}

export default class PixelMock {
  constructor(){
    const piece1 = [] as PieceItem[]
    const piece2 = [] as PieceItem[]
    const piece3 = [] as PieceItem[]
    const piece4 = [] as PieceItem[]
    const piece5 = [] as PieceItem[]
    const piece6 = [] as PieceItem[]
    const piece7 = [] as PieceItem[]
    const piece8 = [] as PieceItem[]

    const generateId = () => {
      return (Math.random() * 100000).toFixed(0)
    }


    for(let i=0; i < 144; i++){
      const color =  'white'
      piece1.push({id:(generateId()), color, piece: 'piece1'})
      piece2.push({id:(generateId()), color, piece: 'piece2'})
      piece3.push({id:(generateId()), color, piece: 'piece3'})
      piece4.push({id:(generateId()), color, piece: 'piece4'})
      piece5.push({id:(generateId()), color, piece: 'piece5'})
      piece6.push({id:(generateId()), color, piece: 'piece6'})
      piece7.push({id:(generateId()), color, piece: 'piece7'})
      piece8.push({id:(generateId()), color, piece: 'piece8'})
    }

    this[PixelsKey.piece1] = piece1
    this[PixelsKey.piece2] = piece2
    this[PixelsKey.piece3] = piece3
    this[PixelsKey.piece4] = piece4
    this[PixelsKey.piece5] = piece5
    this[PixelsKey.piece6] = piece6
    this[PixelsKey.piece7] = piece7
    this[PixelsKey.piece8] = piece8

    this.colors = ['#154479', '#5CA9FF', '#0D2A4A']
    
  }

  [PixelsKey.piece1]: Array<Pixel>;
  [PixelsKey.piece2]: Array<Pixel>;
  [PixelsKey.piece3]: Array<Pixel>;
  [PixelsKey.piece4]: Array<Pixel>;
  [PixelsKey.piece5]: Array<Pixel>;
  [PixelsKey.piece6]: Array<Pixel>;
  [PixelsKey.piece7]: Array<Pixel>;
  [PixelsKey.piece8]: Array<Pixel>;
  colors: Array<string>;
  
}