<template>
  <va-card>
    <va-card-content>
      <div
        v-if="pixels?.length > 0"
        class="tw-bg-white tw-w-full tw-p-3 tw-py-5 tw-rounded-md"
      >
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2"
        >
          <h3 class="tw-text-2xl tw-font-bold tw-text-center">
            Pixel(s) Selecionado(s):
          </h3>
          <div class="tw-flex tw-flex-wrap tw-justify-center">
            <div
              v-for="(pixel, i) in pixels"
              :key="i"
              class="tw-font-bold tw-text-xl tw-pt-2 tw-m-1"
            >
              {{ `#${pixel.uuid.substring(0, 4)}` }}
            </div>
          </div>
        </div>

        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2"
        >
          <h3 class="tw-text-2xl tw-font-bold">Cor(es):</h3>
          <div class="tw-flex tw-flex-wrap">
            <div
              v-for="(pixel, i) in pixels"
              :key="i"
              :style="`background-color: ${pixel.color};`"
              class="tw-h-8 tw-w-8 tw-m-1 tw-mt-2"
            ></div>
          </div>
        </div>

        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2"
        >
          <h3 class="tw-text-2xl tw-font-bold">Quantidade:</h3>
          <div
            class="tw-font-bold tw-text-xl tw-mt-2 tw-rounded-full tw-p-1 bg-th-green tw-h-8 tw-w-8 tw-flex tw-justify-center tw-items-center"
          >
            {{ pixels.length }}
          </div>
        </div>

        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2"
        >
          <h3 class="tw-text-2xl tw-font-bold">Total:</h3>
          <div class="tw-font-bold tw-text-3xl tw-pt-2">
            R$ {{ pixels.length + ",00" }}
          </div>
        </div>

        <div class="tw-flex tw-justify-center tw-mt-4">
          <va-button v-if="!hideBuyButton" @click="onBuyPixel()" size="large">
            Comprar agora
          </va-button>
        </div>
      </div>
      <div
        v-else
        class="tw-bg-white tw-w-full tw-flex tw-flex-col tw-justify-center tw-p-3 tw-py-5 tw-rounded-md"
      >
        <h3 class="tw-text-2xl tw-font-bold tw-text-center">
          Selecione seus pixels!
        </h3>
        <div class="tw-font-bold tw-text-md tw-pt-4">
          Você pode selecionar um pixel clicando em qualquer quadrado e
          definindo a cor.
        </div>
      </div>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/modules/Cart/actions";
import { defineComponent } from "vue";
import { Pixel } from "@/types/NFT";

export default defineComponent({
  name: "pixel-sum-card",
  props: {
    pixels: {
      type: Array<Pixel>,
      required: true,
    },
    sortitionId: String,
    hideBuyButton: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onBuyPixel() {
      this.$emit("onBuyPixel");
    },
  },
});
</script>
