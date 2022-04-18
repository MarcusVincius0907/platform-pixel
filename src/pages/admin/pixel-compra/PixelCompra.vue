<template>
  <div class="w-full h-full d-flex ">
    <div class="overflow-x-auto max-w-[780px]">
      <div class=" min-w-[780px] bg-gray-200 m-auto d-flex flex-wrap shadow-2xl ">

        <div class="d-flex max-w-[300px] flex-wrap">
          <div v-for="(s,i) in piece1" @click="openColorModal(s.id, 'piece1')" :key="i" :style="`background-color: ${s.color};`" class="square" ></div>
        </div>
        <div class="d-flex max-w-[200px] flex-wrap">
          <div v-for="(s,i) in piece2" @click="openColorModal(s.id, 'piece2')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
        </div>
        <div class="d-flex max-w-[280px] flex-wrap">
          <div v-for="(s,i) in piece3" @click="openColorModal(s.id, 'piece3')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
        </div>
        <div class="d-flex max-w-[300px] flex-wrap">
          <div v-for="(s,i) in piece4" @click="openColorModal(s.id, 'piece4')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
        </div>
        <div class="w-full  max-w-[200px] h-[200px] ">
          <div class="w-full h-full d-flex p-5 image-pixel">

            <img src="../../../../public/img/logo.png" alt="">
          </div>
        </div>
        <div class="d-flex max-w-[280px] flex-wrap">
          <div v-for="(s,i) in piece5" @click="openColorModal(s.id, 'piece5')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
        </div>
        <div class="d-flex max-w-[300px] flex-wrap">
          <div v-for="(s,i) in piece6" @click="openColorModal(s.id, 'piece6')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
        </div>
        <div class="d-flex max-w-[200px] flex-wrap">
          <div v-for="(s,i) in piece7" @click="openColorModal(s.id, 'piece7')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
        </div>
        <div class="d-flex max-w-[280px] flex-wrap ">
          <div v-for="(s,i) in piece8" @click="openColorModal(s.id, 'piece8')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
        </div>
        
      </div>
    </div>

    <div class=" w-full  rounded-md pl-5">
      <div class="bg-white w-full  p-3 py-5 max-w-sm rounded-md">

        <div class="d-flex flex-col items-center justify-center text-th-blue py-2">
          <h3 class="  text-2xl font-bold text-center">Pixel(s) Selecionado(s):</h3>
          <div class="font-bold text-xl pt-2">#123</div>
        </div>

        <div class="d-flex flex-col items-center justify-center text-th-blue py-2">
          <h3 class="  text-2xl font-bold">Cor(es):</h3>
          <div class="h-8 w-8 bg-blue-500 mt-2"></div>
        </div>

        <div class="d-flex flex-col items-center justify-center text-th-blue py-2">
          <h3 class="  text-2xl font-bold"> Quantidade:</h3>
          <div class="font-bold text-xl mt-2 rounded-full p-1 bg-th-green h-8 w-8 d-flex justify-center items-center">{{pixels.length}}</div>
        </div>

        <div class="d-flex flex-col items-center justify-center text-th-blue py-2">
          <h3 class="  text-2xl font-bold">Total:</h3>
          <div class="font-bold text-3xl pt-2">R$ 1,00</div>
        </div>

        <div class="d-flex justify-center mt-4">
          <va-button size="large"> Comprar agora </va-button>
        </div>

      </div>
    </div>

    <va-modal
      v-model="showModal"
      hide-default-actions
      overlay-opacity="0.2"
    >
      <template #header>
        <h2>Selecione a cor:</h2>
      </template>
      <slot>
        <div class="d-flex justify-between mt-3">
          <div class="h-8 w-8 cursor-pointer hover:opacity-80" @click="setPixelColor(item)"  v-for="(item,i) in colors" :key="i" :style="`background-color:${item}`" ></div>
          
          
        </div>
      </slot>
      <template #footer>
        <va-button @click="clearPixelSelection(currentPixelSelected)">
          Limpar
        </va-button>
      </template>
    </va-modal>
    
  </div>
</template>

<script lang='ts'>
import {ref} from  'vue'
import PixelMock from '../../../data/pixel/index'
import {PixelsKey} from '@/types/Pixel'

interface Pixel {
  id: string; 
  color: string;
  piece: string;
}

export default {
  name: 'pixel-compra',
  components: {
   
  },
  
  setup(){
    
    const pixelMock = new PixelMock();

    return{
      piece1: ref(pixelMock.piece1),
      piece2: ref(pixelMock.piece2),
      piece3: ref(pixelMock.piece3),
      piece4: ref(pixelMock.piece4),
      piece5: ref(pixelMock.piece5),
      piece6: ref(pixelMock.piece6),
      piece7: ref(pixelMock.piece7),
      piece8: ref(pixelMock.piece8),
      colors: ref(pixelMock.colors),
      showModal: ref(false),
      currentPixelSelected: ref({id:'', color:'', piece: ''} as Pixel),
      pixels: ref([] as Array<Pixel>)

    }
  },
  methods: {
    openColorModal(id: any, piece: string){
      this.showModal = !this.showModal
      this.currentPixelSelected.id = id
      this.currentPixelSelected.piece = piece

    },
    
    setPixelColor(color: string){
      debugger
      this.currentPixelSelected.color = color;
      this.changePieceColor(this.currentPixelSelected)
      this.pixels.push(this.currentPixelSelected)
      console.log(this.pixels);
      
      this.showModal = false;
    },

    clearPixelSelection(pixel: Pixel){
      debugger
      this.pixels = this.pixels.filter((el: any) => {debugger; return el.id != pixel.id})
      this.currentPixelSelected.color = 'white'
      this.changePieceColor(this.currentPixelSelected)
    },

    changePieceColor(pixel: Pixel){
      
      switch(pixel.piece){
        case PixelsKey.piece1: 
          this[PixelsKey.piece1].forEach((el, i, arr) => {
            
            if(el.id == pixel.id){
              arr[i].color = pixel.color;
            }
          });
          break;
        
        case PixelsKey.piece2: 
          this[PixelsKey.piece2].forEach((el, i, arr) => {
            if(el.id == pixel.id){
              arr[i].color = pixel.color;
            }
          });
          break;

        case PixelsKey.piece3: 
          this[PixelsKey.piece3].forEach((el, i, arr) => {
            if(el.id == pixel.id){
              arr[i].color = pixel.color;
            }
          });
          break;
          
        case PixelsKey.piece4: 
          this[PixelsKey.piece4].forEach((el, i, arr) => {
            if(el.id == pixel.id){
              arr[i].color = pixel.color;
            }
          });
          break;

        case PixelsKey.piece5: 
          this[PixelsKey.piece5].forEach((el, i, arr) => {
            if(el.id == pixel.id){
              arr[i].color = pixel.color;
            }
          });
          break;

        case PixelsKey.piece6: 
          this[PixelsKey.piece6].forEach((el, i, arr) => {
            if(el.id == pixel.id){
              arr[i].color = pixel.color;
            }
          });
          break;

        case PixelsKey.piece7: 
          this[PixelsKey.piece7].forEach((el, i, arr) => {
            if(el.id == pixel.id){
              arr[i].color = pixel.color;
            }
          });
          break;

        case PixelsKey.piece8: 
          this[PixelsKey.piece8].forEach((el, i, arr) => {
            if(el.id == pixel.id){
              arr[i].color = pixel.color;
            }
          });
          break;
        
        default: 
          console.log('could not set color');
          

      }
    }

    //mostrar na tela a cor e ao salvar a compra, enviar as cores ao back
    
  },
}
</script>

<style lang="scss">
.square{
  width: 20px;
  height: 20px;
  /* background: gray; */
  border: 1px solid gray;
  cursor:pointer;
  position: relative;
  &:hover{
    opacity: 0.8;
  }
}

.image-pixel{
  border: 8px solid #01a78d;
}

.custom-shadow{
  box-shadow: 1px 1px 41px #707070;
}

.modal-color{
  position: absolute;
  background-color: white;
  padding: 20px;
  top: 20px;
  box-shadow: 11px 21px 21px #0000007a;
  border-radius: 10px;
  z-index: 1;
}

input[type="color"] {
	-webkit-appearance: none;
	border: none;
  border: 1px solid white;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}
</style>
