<template>
  <!-- TODO: separete into components (modal, pixel) -->
  <div v-if="sortition && nftMeasurement" class="tw-w-full tw-h-full">
    <div class="tw-mb-5">
      <va-card>
        <va-card-content>
          <div class="tw-text-xl">
            O sorteio ocorrerá
            <strong>{{ moment(sortition.date).format('DD/MM/yyyy') + ', ' }}</strong>
            você pode ganhar até
            <strong> {{ 'R$ ' + sortition.reward }} </strong>
          </div>
        </va-card-content>
      </va-card>
    </div>
    <div class="tw-flex tw-flex-col md:tw-flex-row">
      <RenderNFT
        ref="childComponentRef"
        :nftMeasurement="nftMeasurement"
        :edittable="true"
        :pixelSize="pixelSize"
        @pixelsSelectedForBuy="updatePixelsSelectedForBuy"
      />

      <div class="md:tw-pl-5 tw-mt-5 md:tw-mt-0 md:tw-max-w-sm">
        <PixelSumCard :pixels="pixelsSelectedForBuy" :hideBuyButton="false" @onBuyPixel="onBuyPixel()" />
      </div>
    </div>
  </div>
  <div v-else>Sem sorteios por agora...</div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import PixelSumCard from './PixelSumCard.vue'
  import { ActionTypes } from '@/store/modules/Sortition/actions'
  import { ActionTypes as NFTActionTypes } from '@/store/modules/NFT/actions'
  import { ActionTypes as CartActionTypes } from '@/store/modules/Cart/actions'
  import moment from 'moment'
  import { Pixel } from '@/types/NFT'
  import RenderNFT from '@/components/NFT/RenderNFT.vue'

  const PIXEL_SIZE = 20

  export default defineComponent({
    name: 'pixel',
    components: {
      PixelSumCard,
      RenderNFT,
    },

    setup() {
      return {
        showModal: ref(false),
        pixelSelected: ref({} as Pixel),
        pixelsSelectedForBuy: ref([] as Array<Pixel>),
        moment: moment,
        pixelSize: PIXEL_SIZE,
        childComponentRef: ref(),
      }
    },

    mounted() {
      if (this.$route.query?.sortitionId) {
        this.$store.dispatch(ActionTypes.GET_SORTITION_BY_ID, this.$route.query?.sortitionId)
      } else {
        this.$store.dispatch(ActionTypes.DEFINE_SELECTED_SORTITION_RANDOMLY)
      }
    },

    methods: {
      onBuyPixel() {
        this.$store.dispatch(CartActionTypes.UPDATE_CART, this.pixelsSelectedForBuy)
        const sortitionId = this.sortition?._id
        this.$router.push({ name: 'checkout', query: { sortitionId } })
      },
      updatePixelsSelectedForBuy($event: any) {
        this.pixelsSelectedForBuy = $event
      },
    },

    computed: {
      sortition() {
        return this.$store.state.SortitionModule?.selectedSortition
      },

      nftMeasurement() {
        return this.$store.state.NFTModule?.nftMeasurement
      },

      user() {
        return this.$store.state.user
      },

      cart() {
        return this.$store.state.NFTModule?.nftMeasurement && this.$store.state.CartModule.cart
          ? this.$store.state.CartModule.cart
          : undefined
      },
    },

    watch: {
      sortition(nValue) {
        if (nValue) {
          this.$store.dispatch(NFTActionTypes.GET_NFT_MEASUREMENT, {
            nftId: nValue.idNFTSummary,
            pixelSize: PIXEL_SIZE,
          })

          this.$store.dispatch(CartActionTypes.GET_CART, nValue._id)
        }
      },

      nftMeasurement(nValue) {
        if (nValue) {
          if (this.cart) {
            this.childComponentRef?.value?.updatePixelsFromCartToNFT(this.cart)
            /* this.updatePixelsFromCartToNFT(this.cart); */
          }
        }
      },
    },
  })
</script>
