<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center">
    <div class="tw-mb-5 tw-max-w-[885px] tw-w-full">
      <va-card>
        <va-card-content>
          <div class="tw-text-xl tw-text-center tw-font-bold">Checkout</div>
        </va-card-content>
      </va-card>
    </div>
    <div v-if="cart" class="tw-flex tw-flex-col md:tw-flex-row tw-max-w-[885px] tw-w-full">
      <div class="tw-mt-5 md:tw-mt-0 md:tw-max-w-sm">
        <PixelSumCard :pixels="cart.pixels" />
      </div>

      <div class="md:tw-pl-5 tw-mt-5 md:tw-mt-0 tw-max-w-[500px] tw-w-full">
        <va-card>
          <va-card-content>
            <div class="tw-bg-white">
              <va-tabs grow v-model="tabValue" style="width: 100%">
                <template #tabs>
                  <va-tab @click="onTabChange()" v-for="title in tabTitles.slice(0, 3)" :key="title">
                    {{ title }}
                  </va-tab>
                </template>
              </va-tabs>
              <!-- credit card tab -->
              <div class="row" v-if="tabValue === 0">
                <div class="flex xs12">
                  <va-form ref="formAddress" @validation="validation = $event">
                    <div class="mb-2">
                      <va-input
                        v-model="formData.cardNumber"
                        type="number"
                        label="Número do cartão"
                        :rules="[fieldsValidations.required, fieldsValidations.number]"
                      >
                      </va-input>
                    </div>
                    <div class="mb-2">
                      <va-input
                        v-model="formData.cardName"
                        type="string"
                        label="Titular do cartão"
                        :rules="[fieldsValidations.required]"
                      >
                      </va-input>
                    </div>
                    <div class="mb-2 tw-flex">
                      <va-input
                        v-model="formData.expirationDate"
                        type="string"
                        label="Validade"
                        @keydown="onKeyup"
                        :rules="[fieldsValidations.required]"
                      >
                      </va-input>
                      <va-input
                        class="tw-ml-2"
                        v-model="formData.cvv"
                        type="string"
                        label="Código de segurança (cvv)"
                        :rules="[fieldsValidations.required, fieldsValidations.maxLength(3)]"
                      >
                      </va-input>
                    </div>

                    <div class="tw-flex tw-justify-center">
                      <va-button @click="finalizeQuote()" class="mr-2 mb-2"> Finalizar compra</va-button>
                    </div>
                  </va-form>
                </div>
              </div>
              <!-- pix tab -->
              <div class="row" v-if="tabValue === 1">
                <div class="flex xs12">
                  <div class="">
                    <div class="tw-max-w-[250px] tw-m-auto tw-mb-5">
                      <img src="/public/pix-logo.png" alt="" />
                    </div>
                    <div class="tw-ml-10 tw-max-w-[360px]">
                      <div class="tw-mb-2">
                        <i class="fa-solid fa-check"></i>
                        <span class="tw-ml-2 tw-text-sm"
                          >Copie ou faça a leitura do código QR Code através do site ou app do seu banco</span
                        >
                      </div>
                      <div class="tw-mb-2">
                        <i class="fa-solid fa-check"></i>
                        <span class="tw-ml-2 tw-text-sm">O código é válido por 30 minutos</span>
                      </div>
                      <div class="tw-mb-2">
                        <i class="fa-solid fa-check"></i>
                        <span class="tw-ml-2 tw-text-sm">O pedido só é confirmado após o pagamento</span>
                      </div>
                    </div>
                  </div>
                  <div class="tw-flex tw-justify-center">
                    <va-button @click="finalizeQuote()" class="mr-2 mb-2"> Finalizar compra</va-button>
                  </div>
                </div>
              </div>
              <!-- payment slip tab -->
              <div @click="onTabChange(3)" class="row" v-if="tabValue === 2">
                <div class="flex xs12">
                  <div>
                    <div class="tw-flex tw-items-center tw-mb-3">
                      <svg class="tw-max-w-[40px]" id="icon-print-rounded" viewBox="0 0 64 64">
                        <path
                          fill="#666"
                          d="M 32 0 A 32 32 0 0 0 0 32 A 32 32 0 0 0 32 64 A 32 32 0 0 0 64 32 A 32 32 0 0 0 32 0 z M 20 14 L 44 14 L 44 21 L 20 21 L 20 14 z M 16.5 23 L 47.5 23 C 49.4 23 51 24.6 51 26.5 L 51 41.5 C 51 43.4 49.4 45 47.5 45 L 46 45 L 46 30 L 18 30 L 18 45 L 16.5 45 C 14.6 45 13 43.4 13 41.5 L 13 26.5 C 13 24.6 14.6 23 16.5 23 z M 21 33 L 43 33 L 43 52 L 21 52 L 21 33 z M 23 36 L 23 37 L 41 37 L 41 36 L 23 36 z M 23 39 L 23 40 L 41 40 L 41 39 L 23 39 z M 23 42 L 23 43 L 41 43 L 41 42 L 23 42 z M 23 45 L 23 46 L 41 46 L 41 45 L 23 45 z M 23 48 L 23 49 L 41 49 L 41 48 L 23 48 z "
                        ></path>
                      </svg>
                      <span class="ml-3">Você pode <strong> imprimir o boleto </strong> e pagar no banco</span>
                    </div>
                    <div class="tw-flex tw-items-center tw-mb-3">
                      <svg class="tw-max-w-[40px]" id="icon-barcode-rounded" viewBox="0 0 64 64">
                        <path
                          fill="#666"
                          d="M 32 0 A 32 32 0 0 0 0 32 A 32 32 0 0 0 32 64 A 32 32 0 0 0 64 32 A 32 32 0 0 0 32 0 z M 15.7 16 L 49.3 16 C 50.8 16 52 17.2 52 18.7 L 52 20 L 49 20 L 49 19.9 C 49 19.4 48.6 19 48.1 19 L 16.9 19 C 16.4 19 16 19.4 16 19.9 L 16 38.1 C 16 38.6 16.4 39 16.9 39 L 48.1 39 C 48.6 39 49 38.6 49 38.1 L 49 37 L 52 37 L 52 39.3 C 52 40.8 50.8 42 49.3 42 L 15.7 42 C 14.2 42 13 40.8 13 39.3 L 13 18.7 C 13 17.2 14.2 16 15.7 16 z M 36 22 L 57 22 L 57 35 L 36 35 L 36 22 z M 39 24 L 39 33 L 41 33 L 41 24 L 39 24 z M 43 24 L 43 33 L 44 33 L 44 24 L 43 24 z M 45 24 L 45 33 L 46 33 L 46 24 L 45 24 z M 48 24 L 48 33 L 50 33 L 50 24 L 48 24 z M 52 24 L 52 33 L 53 33 L 53 24 L 52 24 z M 54 24 L 54 33 L 55 33 L 55 24 L 54 24 z M 10 44 L 28 44 C 28 44.6 28.4 45 29 45 L 37 45 C 37.5 45 38 44.6 38 44 L 54 44 C 54.6 44 54.8 44.4 54.5 44.9 L 53.4 47.1 C 53.2 47.6 52.5 48 52 48 L 12 48 C 11.5 48 10.8 47.6 10.6 47.1 L 9.5 44.9 C 9.2 44.4 9.5 44 10 44 z M 50 45 C 49.4 45 49 45.4 49 46 C 49 46.6 49.4 47 50 47 C 50.6 47 51 46.6 51 46 C 51 45.4 50.6 45 50 45 z "
                        ></path>
                      </svg>
                      <span class="ml-3"
                        >Ou pode <strong> pagar pela internet </strong> utilizando o código de barras do boleto</span
                      >
                    </div>
                    <div class="tw-flex tw-items-center tw-mb-3">
                      <svg class="tw-max-w-[40px]" id="icon-calendar-rounded" viewBox="0 0 64 64">
                        <path
                          fill="#666"
                          d="M 32 0 C 14.3 0 0 14.3 0 32 C 0 49.7 14.3 64 32 64 C 49.7 64 64 49.7 64 32 C 64 14.3 49.7 0 32 0 z M 24 9 C 25.1 9 26 9.9 26 11 L 26 18 C 26 19.1 25.1 20 24 20 C 22.9 20 22 19.1 22 18 L 22 11 C 22 9.9 22.9 9 24 9 z M 40 9 C 41.1 9 42 9.9 42 11 L 42 18 C 42 19.1 41.1 20 40 20 C 38.9 20 38 19.1 38 18 L 38 11 C 38 9.9 38.9 9 40 9 z M 14 15 L 20 15 L 20 18.4 C 20 20.4 21.6 22 23.6 22 L 24.4 22 C 26.4 22 28 20.4 28 18.4 L 28 15 L 36 15 L 36 18.4 C 36 20.4 37.6 22 39.6 22 L 40.4 22 C 42.4 22 44 20.4 44 18.4 L 44 15 L 50 15 C 50.6 15 51 15.5 51 16 L 51 48 C 51 48.6 50.5 49 50 49 L 14 49 C 13.4 49 13 48.5 13 48 L 13 16 C 13 15.4 13.5 15 14 15 z M 16 24.3 L 16 45.3 L 48 45.3 L 48 24.3 L 16 24.3 z "
                        ></path>
                      </svg>
                      <span class="ml-3">
                        Lembrando que o prazo de validade do boleto é de
                        <strong> 1 dia util </strong></span
                      >
                    </div>
                  </div>
                  <div class="tw-flex tw-justify-center">
                    <va-button @click="finalizeQuote()" class="mr-2 mb-2"> Finalizar compra</va-button>
                  </div>
                </div>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>
    <va-modal v-model="showMessageModal" hide-default-actions overlay-opacity="0.2">
      <template #header>
        <div class="tw-flex tw-justify-between">
          <h2 class="tw-font-bold tw-text-xl">
            <span>Muito bem!</span>
          </h2>
        </div>
      </template>
      <slot>
        <div class="tw-w-full tw-max-w-2xl tw-mt-4">
          {{ responseMessage }}
          <br />
          <br />
          Você pode conferir seus pixels clicando no botão abaixo:
        </div>
      </slot>
      <template #footer>
        <va-button @click="goToMyOrders()"> Ir para meus pedidos </va-button>
      </template>
    </va-modal>
  </div>
</template>

<script lang="ts">
  import { ActionTypes } from '@/store/modules/Cart/actions'
  import { fieldValidations } from '@/utils/fieldValidations'
  import { formatExpDate } from '@/utils/formatExpDate'
  import { defineComponent, ref } from 'vue'
  import PixelSumCard from '../pixel/PixelSumCard.vue'
  import { PaymentMethods } from '@/types/Payment'
  import { MutationsType } from '@/store/modules/Checkout/mutations'
  import { ActionTypes as CheckoutActionTypes } from '@/store/modules/Checkout/actions'
  import { CheckoutResponse } from '@/types/Checkout'

  export default defineComponent({
    name: 'checkout',
    components: {
      PixelSumCard,
    },
    setup() {
      const formData = ref({
        cardNumber: '',
        cardName: '',
        expirationDate: '',
        cvv: '',
      })
      return {
        tabTitles: ['Cartão de Crédito', 'Pix', 'Boleto'],
        tabValue: ref(0),
        formData,
        fieldsValidations: fieldValidations,
        paymentMethod: ref(PaymentMethods.CREDIT_CARD),
        responseMessage: ref(''),
        showMessageModal: ref(false),
      }
    },

    methods: {
      finalizeQuote() {
        this.$store.commit(MutationsType.SET_CHECKOUT_REQUEST, {
          paymentMethod: this.paymentMethod,
        })
        this.$store.dispatch(CheckoutActionTypes.MAKE_CHECKOUT_REQUEST)
      },

      onTabChange() {
        if (this.tabValue === 0) {
          this.paymentMethod = PaymentMethods.CREDIT_CARD
        } else if (this.tabValue === 1) {
          this.paymentMethod = PaymentMethods.PIX
        } else if (this.tabValue === 2) {
          this.paymentMethod = PaymentMethods.PAYMENT_SLIP
        }
      },

      onKeyup(event) {
        this.formData.expirationDate = formatExpDate(event, this.formData.expirationDate) ?? ''
      },

      goToMyOrders() {
        this.$router.push({ name: 'my-pixel' })
      },
    },

    computed: {
      cart() {
        return this.$store.state.CartModule.cart
      },

      user() {
        return this.$store.state.user
      },

      needToGetCart() {
        return (
          !this.cart &&
          this.user?._id &&
          (this.$store.state.SortitionModule.selectedSortition || this.$route.query?.sortitionId)
        )
      },

      checkoutResponse() {
        return this.$store.state.CheckoutModule.checkoutResponse
      },
    },

    watch: {
      needToGetCart(nValue) {
        if (nValue) {
          this.$store.dispatch(
            ActionTypes.GET_CART,
            this.$store.state.SortitionModule.selectedSortition || this.$route.query?.sortitionId,
          )
        }
      },

      checkoutResponse(nValue: CheckoutResponse) {
        if (nValue) {
          this.responseMessage = 'Obrigado por participar, você adquiriu os pixels: '
          let pixelsStr = ''
          nValue.availablePixels.forEach((cr, i, arr) => {
            if (i + 1 == arr.length) {
              pixelsStr += cr.uuid.substring(0, 5)
            } else {
              pixelsStr += `${cr.uuid.substring(0, 5)}, `
            }
          })

          this.responseMessage += pixelsStr

          pixelsStr = ''

          if (nValue.unavailablePixels.length > 0) {
            this.responseMessage = '\n Mas inflezmente estes não estavam disponívies:  '
            nValue.unavailablePixels.forEach((cr, i, arr) => {
              if (i + 1 == arr.length) {
                pixelsStr += cr.uuid.substring(0, 5)
              } else {
                pixelsStr += `${cr.uuid.substring(0, 5)}, `
              }
            })
            this.responseMessage += pixelsStr
          }

          this.showMessageModal = true
        }
      },
    },
  })
</script>
