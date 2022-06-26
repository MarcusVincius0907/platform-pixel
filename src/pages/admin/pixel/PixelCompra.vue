<template>
  <div class="tw-w-full tw-h-full ">
    <div class="tw-max-w-[780px] tw-mb-5">
      <va-card>
        <va-card-content>
          <div class=" tw-text-xl">NFT referente ao sorteio de <strong>24/06/2022</strong></div>
        </va-card-content>
      </va-card>
    </div>
    <div class=" tw-flex tw-flex-col md:tw-flex-row">
      <div class="tw-overflow-x-auto tw-max-w-[780px]">
        <div class=" tw-min-w-[780px] tw-bg-gray-200 tw-m-auto tw-flex tw-flex-wrap tw-shadow-2xl ">

          <div class="tw-flex tw-max-w-[300px] tw-flex-wrap">
            <div v-for="(s,i) in piece1" @click="openColorModal(s.id, 'piece1')" :key="i" :style="`background-color: ${s.color};`" class="square" ></div>
          </div>
          <div class="tw-flex tw-max-w-[200px] tw-flex-wrap">
            <div v-for="(s,i) in piece2" @click="openColorModal(s.id, 'piece2')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
          </div>
          <div class="tw-flex tw-max-w-[280px] tw-flex-wrap">
            <div v-for="(s,i) in piece3" @click="openColorModal(s.id, 'piece3')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
          </div>
          <div class="tw-flex tw-max-w-[300px] tw-flex-wrap">
            <div v-for="(s,i) in piece4" @click="openColorModal(s.id, 'piece4')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
          </div>
          <div class="tw-w-fultw-l  tw-max-w-[200px] tw-h-[200px] ">
            <div class="tw-w-full tw-h-full tw-flex tw-p-5 image-pixel">

              <img src="../../../../public/img/logo.png" alt="">
            </div>
          </div>
          <div class="tw-flex tw-max-w-[280px] tw-flex-wrap">
            <div v-for="(s,i) in piece5" @click="openColorModal(s.id, 'piece5')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
          </div>
          <div class="tw-flex tw-max-w-[300px] tw-flex-wrap">
            <div v-for="(s,i) in piece6" @click="openColorModal(s.id, 'piece6')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
          </div>
          <div class="tw-flex tw-max-w-[200px] tw-flex-wrap">
            <div v-for="(s,i) in piece7" @click="openColorModal(s.id, 'piece7')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
          </div>
          <div class="tw-flex tw-max-w-[280px] tw-flex-wrap ">
            <div v-for="(s,i) in piece8" @click="openColorModal(s.id, 'piece8')" :key="i" :style="`background-color: ${s.color};`" class="square" > </div>
          </div>
          
        </div>
      </div>

      <div class="  md:tw-pl-5 tw-mt-5 md:tw-mt-0 md:tw-max-w-sm">
        <va-card>
          <va-card-content>

            <div v-if="pixels.length > 0" class="tw-bg-white tw-w-full  tw-p-3 tw-py-5  tw-rounded-md">

              <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2">
                <h3 class="  tw-text-2xl tw-font-bold tw-text-center">Pixel(s) Selecionado(s):</h3>
                <div class="tw-flex tw-flex-wrap tw-justify-center">
                  <div v-for="(pixel,i) in pixels" :key="i" class="tw-font-bold tw-text-xl tw-pt-2 tw-m-1">{{`#${pixel.id}`}}</div>
                </div>
              </div>

              <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2">
                <h3 class="  tw-text-2xl tw-font-bold">Cor(es):</h3>
                <div class=" tw-flex tw-flex-wrap">
                  <div v-for="(pixel,i) in pixels" :key="i" :style="`background-color: ${pixel.color};`" class="tw-h-8 tw-w-8 tw-m-1 tw-mt-2"></div>
                </div>
              </div>

              <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2">
                <h3 class="  tw-text-2xl tw-font-bold"> Quantidade:</h3>
                <div class="tw-font-bold tw-text-xl tw-mt-2 tw-rounded-full tw-p-1 bg-th-green tw-h-8 tw-w-8 tw-flex tw-justify-center tw-items-center">{{pixels.length}}</div>
              </div>

              <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2">
                <h3 class="  tw-text-2xl tw-font-bold">Total:</h3>
                <div class="tw-font-bold tw-text-3xl tw-pt-2">R$ 1,00</div>
              </div>

              <div class="tw-flex tw-justify-center tw-mt-4">
                <va-button size="large"> Comprar agora </va-button>
              </div>

            </div>
            <div v-else class="tw-bg-white tw-w-full tw-flex tw-flex-col tw-justify-center  tw-p-3 tw-py-5  tw-rounded-md">
              <h3 class="  tw-text-2xl tw-font-bold tw-text-center">Selecione seus pixels!</h3>
              <div  class="tw-font-bold tw-text-md tw-pt-4">Você pode selecionar um pixel clicando em qualquer quadrado e definindo a cor.</div>
            </div>
          </va-card-content>
        </va-card>
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
        <div class="tw-flex tw-justify-between tw-mt-3">
          <div class="tw-h-8 tw-w-8 tw-cursor-pointer hover:tw-opacity-80" @click="setPixelColor(item)"  v-for="(item,i) in colors" :key="i" :style="`background-color:${item}`" ></div>
          
          
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
import { defineComponent } from 'vue'

interface Pixel {
  id: string; 
  color: string;
  piece: string;
}


export default defineComponent({
  name: 'pixel',
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
    openColorModal(id: string, piece: string){
      this.showModal = !this.showModal
      this.currentPixelSelected.id = id
      this.currentPixelSelected.piece = piece

    },
    
    setPixelColor(color: string){
      this.currentPixelSelected.color = color;
      this.changePieceColor(this.currentPixelSelected)
      this.pixels.push({...this.currentPixelSelected})
      console.log(this.pixels);
      
      this.showModal = false;
    },

    clearPixelSelection(pixel: Pixel){
      this.pixels = this.pixels.filter((el: Pixel) => { return el.id != pixel.id})
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
})
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
