<template>
  <div
    :style="{ maxWidth: nftMeasurement.NFTWidth + 'px' }"
    class="tw-overflow-x-auto"
  >
    <div
      :style="{ minWidth: nftMeasurement.NFTWidth + 'px' }"
      class="tw-bg-gray-200 tw-m-auto tw-flex tw-flex-wrap tw-shadow-2xl"
    >
      <div
        v-for="(chunk, i) in nftMeasurement.nft.chunks"
        :key="i"
        class="tw-flex tw-flex-wrap"
      >
        <div
          v-if="chunk.position == 4"
          :style="{
            width: nftMeasurement.chunkWidth + 'px',
            height: nftMeasurement.chunkWidth + 'px',
          }"
          class=""
        >
          <div class="tw-w-full tw-h-full tw-flex tw-p-5 image-pixel">
            <img src="../../../public/img/logo.png" alt="" />
          </div>
        </div>
        <div
          :style="{
            width: nftMeasurement.chunkWidth + 'px',
            height: nftMeasurement.chunkWidth + 'px',
          }"
          class="tw-flex tw-flex-wrap"
        >
          <div
            v-for="(pixel, i) in chunk.pixels"
            @click="openColorModal(pixel)"
            :key="i"
            :style="`background-color: ${pixel.color}; width: ${pixelSize}px; height: ${pixelSize}px;`"
            class="square"
          ></div>
        </div>
      </div>
    </div>
    <va-modal v-model="showModal" hide-default-actions overlay-opacity="0.2">
      <template #header>
        <h2>Selecione a cor:</h2>
      </template>
      <slot>
        <div
          v-if="themes().length > 0"
          class="tw-flex tw-justify-between tw-mt-3"
        >
          <div
            class="tw-h-8 tw-w-8 tw-cursor-pointer hover:tw-opacity-80"
            @click="setPixelColor(`#${item}`)"
            v-for="(item, i) in themes()"
            :key="i"
            :style="`background-color: #${item}`"
          ></div>
        </div>
        <div v-else>Não foram encontradas as cores...</div>
      </slot>
      <template #footer>
        <div class="tw-flex tw-flex-col">
          <va-button @click="clearPixelSelection()"> Limpar </va-button>
          <va-button class="tw-mt-2" flat size="small" @click="clearAll()">
            Limpar todos
          </va-button>
        </div>
      </template>
    </va-modal>
  </div>
</template>

<script lang="ts">
import { PropType, ref, defineComponent } from "vue";
import { MutationsType as MainMutationsType } from "@/store/mutations";
import { NFTMeasurements, Pixel } from "@/types/NFT";
import { stringToArray } from "@/utils/themesUtil";
import moment from "moment";
import { Cart } from "@/types/Cart";

const PIXEL_SIZE = 20;

export default defineComponent({
  name: "render-nft",
  props: {
    nftMeasurement: {
      required: true,
      type: Object as PropType<NFTMeasurements>,
      default: null,
    },

    pixelSize: {
      required: false,
      type: Number,
      default: PIXEL_SIZE,
    },

    edittable: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  setup() {
    return {
      showModal: ref(false),
      pixelSelected: ref({} as Pixel),
      pixelsSelectedForBuy: ref([] as Array<Pixel>),
      moment: moment,
    };
  },

  methods: {
    openColorModal(pixel: Pixel) {
      if (pixel.isAvailible) {
        this.showModal = !this.showModal;
        this.pixelSelected = pixel;
      } else {
        this.$store.commit(MainMutationsType.SET_NOTIFICATION, {
          title: "Ateção",
          message: "Este pixel já foi comprado!",
          color: "warning",
        });
      }
    },

    setPixelColor(color: string) {
      const pixel = this.changePieceColor(this.pixelSelected, color);
      this.pixelsSelectedForBuy.push(pixel);
      this.showModal = false;
    },

    clearPixelSelection() {
      this.pixelsSelectedForBuy.forEach((pixel, i, arr) => {
        if (pixel.uuid === this.pixelSelected.uuid) {
          arr[i].color = "white";
        }
      });

      this.pixelsSelectedForBuy = this.pixelsSelectedForBuy.filter(
        (pixel) => pixel.uuid !== this.pixelSelected.uuid
      );

      this.showModal = false;
    },

    clearAll() {
      this.pixelsSelectedForBuy.forEach((pixel, i, arr) => {
        arr[i].color = "white";
      });

      this.pixelsSelectedForBuy = [];

      this.showModal = false;
    },

    changePieceColor(pixelC: Pixel, color: string) {
      let pixelFound: any;
      this.nftMeasurement?.nft.chunks?.forEach((chunk) => {
        if (chunk.position === pixelC.chunkPosition) {
          chunk.pixels.forEach((pixel, i, arr) => {
            if (pixel.position === pixelC.position) {
              arr[i].color = color;
              pixelFound = arr[i];
            }
          });
        }
      });

      return pixelFound;
    },

    themes() {
      if (this.nftMeasurement) {
        return stringToArray(this.nftMeasurement.themes);
      }

      return [];
    },

    updatePixelsFromCartToNFT(cart: Cart) {
      const pixelsSelected = [...this.pixelsSelectedForBuy] as Array<Pixel>;
      if (cart?.pixels?.length > 0) {
        cart.pixels.forEach((cartPixel) => {
          const pixelRef =
            this.nftMeasurement?.nft.chunks[cartPixel.chunkPosition].pixels[
              cartPixel.position
            ];
          if (pixelRef) {
            pixelRef.color = cartPixel.color;
            if (!pixelsSelected.find((pixel) => pixel._id === pixelRef._id)) {
              pixelsSelected.push(pixelRef);
            }
          }
        });
      }
      if (pixelsSelected.length > 0) {
        this.pixelsSelectedForBuy = pixelsSelected;
      }
    },
  },
});
</script>

<style lang="scss">
.square {
  border: 0.3px solid #ededed;
  cursor: pointer;
  position: relative;
  &:hover {
    opacity: 0.1;
  }
}
</style>
