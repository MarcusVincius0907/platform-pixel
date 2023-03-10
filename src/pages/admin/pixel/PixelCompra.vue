<template>
  <div v-if="sortition && nftMeasurement" class="tw-w-full tw-h-full">
    <div :style="[customStyles.maxWidthNFT]" class="tw-mb-5">
      <va-card>
        <va-card-content>
          <div class="tw-text-xl">
            O sorteio ocorrerá
            <strong>{{
              moment(sortition.date).format("DD/MM/yyyy") + ", "
            }}</strong>
            você pode ganhar até
            <strong> {{ "R$ " + sortition.reward }} </strong>
          </div>
        </va-card-content>
      </va-card>
    </div>
    <div class="tw-flex tw-flex-col md:tw-flex-row">
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
            :style="{
              width: nftMeasurement.chunkWidth + 'px',
              height: nftMeasurement.chunkWidth + 'px',
            }"
            class="tw-flex tw-flex-wrap"
          >
            <div
              v-if="chunk.position == -1"
              :style="{
                width: nftMeasurement.chunkWidth + 'px',
                height: nftMeasurement.chunkWidth + 'px',
              }"
              class=""
            >
              <div class="tw-w-full tw-h-full tw-flex tw-p-5 image-pixel">
                <img src="../../../../public/img/logo.png" alt="" />
              </div>
            </div>
            <div v-else class="tw-flex tw-flex-wrap">
              <div
                v-for="(pixel, i) in chunk.pixels"
                @click="openColorModal(chunk.position, pixel.position)"
                :key="i"
                :style="`background-color: ${pixel.color};`"
                class="square"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="md:tw-pl-5 tw-mt-5 md:tw-mt-0 md:tw-max-w-sm">
        <PixelSumCard :pixels="pixels" :hideBuyButton="false" />
      </div>
    </div>

    <va-modal v-model="showModal" hide-default-actions overlay-opacity="0.2">
      <template #header>
        <h2>Selecione a cor:</h2>
      </template>
      <slot>
        <div class="tw-flex tw-justify-between tw-mt-3">
          <div
            class="tw-h-8 tw-w-8 tw-cursor-pointer hover:tw-opacity-80"
            @click="setPixelColor(item)"
            v-for="(item, i) in colors"
            :key="i"
            :style="`background-color:${item}`"
          ></div>
        </div>
      </slot>
      <template #footer>
        <va-button @click="clearPixelSelection(currentPixelSelected)">
          Limpar
        </va-button>
      </template>
    </va-modal>
  </div>
  <div v-else>Sem sorteios por agora...</div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import PixelSumCard from "./PixelSumCard.vue";
import { ActionTypes } from "@/store/modules/Sortition/actions";
import { ActionTypes as NFTActionTypes } from "@/store/modules/NFT/actions";
import moment from "moment";
import { Pixel, PixelCordinates } from "@/types/NFT";

const PIXEL_SIZE = 20;

export default defineComponent({
  name: "pixel",
  components: {
    PixelSumCard,
  },

  setup() {
    return {
      showModal: ref(false),
      pixelSelected: ref({
        chunkPosition: 0,
        pixelPosition: 0,
      } as PixelCordinates),
      pixelsSelectedForBuy: ref([] as Array<Pixel>),
      moment: moment,
    };
  },

  mounted() {
    if (this.$route.query?.sortitionId) {
      this.$store.dispatch(
        ActionTypes.GET_SORTITION_BY_ID,
        this.$route.query?.sortitionId
      );
    } else {
      this.$store.dispatch(ActionTypes.DEFINE_SELECTED_SORTITION_RANDOMLY);
    }
  },

  methods: {
    openColorModal(chunkPosition: number, pixelPosition: number) {
      this.showModal = !this.showModal;
      this.pixelSelected = { chunkPosition, pixelPosition };
    },

    setPixelColor(color: string) {
      const pixel = this.changePieceColor(this.pixelSelected, color);
      this.pixelsSelectedForBuy.push(pixel);
      this.showModal = false;
    },

    clearPixelSelection(pixel: Pixel) {
      //TODO continue here
      /* this.pixelsSelectedForBuy = this.pixelsSelectedForBuy.filter((el: Pixel) => {
        return el._id != pixel._id;
      });
      this.currentPixelSelected.color = "white";
      this.changePieceColor(this.currentPixelSelected); */
    },

    changePieceColor(pixelC: PixelCordinates, color: string) {
      let pixelFound;
      this.nftMeasurement?.nft.chunks?.forEach((chunk) => {
        if (chunk.position === pixelC.chunkPosition) {
          chunk.pixels.forEach((pixel, i, arr) => {
            arr[i].color = color;
            pixelFound = arr[i];
          });
        }
      });
      return pixelFound;
    },
  },

  computed: {
    sortition() {
      return this.$store.state.sortition?.selectedSortition;
    },

    nftMeasurement() {
      return this.$store.state.NFT?.nftMeasurement;
    },
  },

  watch: {
    sortition(nValue) {
      if (nValue) {
        this.$store.dispatch(NFTActionTypes.GET_NFT_MEASUREMENT, {
          nftId: nValue.idNFTSummary,
          pixelSize: PIXEL_SIZE,
        });
      }
    },
  },
});
</script>

<style lang="scss">
.square {
  width: 20px;
  height: 20px;
  /* background: gray; */
  border: 1px solid gray;
  cursor: pointer;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
}

.image-pixel {
  border: 8px solid #01a78d;
}

.custom-shadow {
  box-shadow: 1px 1px 41px #707070;
}

.modal-color {
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
