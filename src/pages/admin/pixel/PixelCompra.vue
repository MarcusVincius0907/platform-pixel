<template>
  <!-- TODO: separete into components (modal, pixel) -->
  <div v-if="sortition && nftMeasurement" class="tw-w-full tw-h-full">
    <div class="tw-mb-5">
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
                <img src="../../../../public/img/logo.png" alt="" />
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
      </div>

      <div class="md:tw-pl-5 tw-mt-5 md:tw-mt-0 md:tw-max-w-sm">
        <PixelSumCard
          :pixels="pixelsSelectedForBuy"
          :hideBuyButton="false"
          @onBuyPixel="onBuyPixel()"
        />
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
  <div v-else>Sem sorteios por agora...</div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import PixelSumCard from "./PixelSumCard.vue";
import { ActionTypes } from "@/store/modules/Sortition/actions";
import { ActionTypes as NFTActionTypes } from "@/store/modules/NFT/actions";
import { ActionTypes as CartActionTypes } from "@/store/modules/Cart/actions";
import { MutationsType as MainMutationsType } from "@/store/mutations";
import moment from "moment";
import { Pixel, PixelCordinates } from "@/types/NFT";
import { stringToArray } from "@/utils/themesUtil";
import { Cart } from "@/types/Cart";

const PIXEL_SIZE = 20;

export default defineComponent({
  name: "pixel",
  components: {
    PixelSumCard,
  },

  setup() {
    return {
      showModal: ref(false),
      pixelSelected: ref({} as Pixel),
      pixelsSelectedForBuy: ref([] as Array<Pixel>),
      moment: moment,
      pixelSize: PIXEL_SIZE,
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

    onBuyPixel() {
      this.$store.dispatch(
        CartActionTypes.UPDATE_CART,
        this.pixelsSelectedForBuy
      );
      const sortitionId = this.sortition?._id;
      this.$router.push({ name: "checkout", query: { sortitionId } });
    },
  },

  computed: {
    sortition() {
      return this.$store.state.SortitionModule?.selectedSortition;
    },

    nftMeasurement() {
      return this.$store.state.NFTModule?.nftMeasurement;
    },

    user() {
      return this.$store.state.user;
    },

    cart() {
      return this.$store.state.NFTModule?.nftMeasurement &&
        this.$store.state.CartModule.cart
        ? this.$store.state.CartModule.cart
        : undefined;
    },
  },

  watch: {
    sortition(nValue) {
      if (nValue) {
        this.$store.dispatch(NFTActionTypes.GET_NFT_MEASUREMENT, {
          nftId: nValue.idNFTSummary,
          pixelSize: PIXEL_SIZE,
        });

        this.$store.dispatch(CartActionTypes.GET_CART, nValue._id);
      }
    },

    /* nftMeasurement: {
      handler() {
        if (this.cart) {
          this.updatePixelsFromCartToNFT(this.cart);
        }
      },
      deep: true,
    }, */

    nftMeasurement(nValue) {
      if (nValue) {
        if (this.cart) {
          this.updatePixelsFromCartToNFT(this.cart);
        }
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
