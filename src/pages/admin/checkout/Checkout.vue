<template>
  <div class="tw-w-full tw-h-full ">
    <div class="tw-mb-5 tw-max-w-[1080px]">
      <va-card>
        <va-card-content>
          <div class="  tw-text-xl tw-text-center tw-font-bold">Checkout</div>
        </va-card-content>
      </va-card>
    </div>
    <div class=" tw-flex tw-flex-col md:tw-flex-row">

      <div class=" tw-mt-5 md:tw-mt-0 md:tw-max-w-sm">
        <PixelSumCard :pixels="pixels" />
      </div>

      <div class="  md:tw-pl-5 tw-mt-5 md:tw-mt-0 tw-max-w-[700px] tw-w-full">
        <va-card>
          <va-card-content>
            <div class=" tw-bg-white">
              <va-tabs grow v-model="tabValue" style="width: 100%">
                <template #tabs>
                  <va-tab
                    v-for="title in tabTitles.slice(0, 3)"
                    :key="title"
                  >
                    {{ title }}
                  </va-tab>
                </template>
              </va-tabs>
              <!-- credit card tab -->
              <div class="row" v-if="tabValue === 1">
                <div class="flex xs12">
                  <va-form ref="formAddress" @validation="validation = $event">
                    <div class="row">
                      <div class="tw-flex tw-w-full">
                        <div class="flex md4 sm6 xs12">
                          <va-input
                            v-model="formData.cardNumber"
                            type="number"
                            label="Número do cartão"
                            :rules="[
                              fieldsValidations.required,
                            ]"
                          >
                          </va-input>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="tw-flex tw-w-full">
                        <div class="flex md4 sm6 xs12">
                          <va-input
                            v-model="formData.cardName"
                            type="string"
                            label="Titular do cartão"
                            :rules="[
                              fieldsValidations.required,
                            ]"
                          >
                          </va-input>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="tw-flex tw-w-full">
                        <div class="flex md4 sm6 xs12">
                          <va-input
                            v-model="formData.expirationDate"
                            type="string"
                            label="Validade"
                            :rules="[
                              fieldsValidations.required,
                            ]"
                          >
                          </va-input>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="tw-flex tw-w-full">
                        <div class="flex md4 sm6 xs12">
                          <va-input
                            v-model="formData.cvv"
                            type="string"
                            label="Código de segurança (cvv)"
                            :rules="[
                              fieldsValidations.required,
                            ]"
                          >
                          </va-input>
                        </div>
                      </div>
                    </div>
                                    
                    <va-button
                      class="mr-2 mb-2"
                    >
                      Finalizar compra</va-button
                    >
                  </va-form>
                </div>
              </div>
              <!-- pix tab -->
              <div class="row" v-if="tabValue === 2">
                <div class="flex xs12">
                                
                </div>
              </div>
              <!-- payment slip tab -->
              <div class="row" v-if="tabValue === 3">
                <div class="flex xs12">
                                
                </div>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>

    </div>
    
  </div>
</template>

<script lang='ts'>
import { fieldValidations } from '@/utils/fieldValidations';
import { defineComponent, ref } from 'vue';
import PixelSumCard from '../pixel/PixelSumCard.vue';

export default defineComponent({
  name: 'checkout',
  components:{
    PixelSumCard
  },
  setup(){
    const formData = ref({
        cardNumber: '',
        cardName: '',
        expirationDate: '',
        cvv: ''
    })
    return{
        pixels: [{"id":"30340","color":"#5CA9FF","piece":"piece5"},{"id":"28450","color":"#0D2A4A","piece":"piece5"},{"id":"14086","color":"#154479","piece":"piece5"},{"id":"92294","color":"#0D2A4A","piece":"piece8"},{"id":"40745","color":"#5CA9FF","piece":"piece8"},{"id":"14611","color":"#5CA9FF","piece":"piece7"}],
        tabTitles: ["Cartão de Crédito", "Pix", "Boleto"],
        tabValue: ref(1),
        formData,
        fieldsValidations: fieldValidations,
    }
  }
})
</script>

