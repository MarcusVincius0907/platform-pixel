<template>
  <div
    class="tw-grid tw-justify-center tw-grid-cols-1 tw-grid-rows-1 md:tw-grid-cols-2 md:tw-grid-rows-2 tw-gap-2"
  >
    <div
      v-for="(myPixel, index) in myPixelList"
      :key="index"
      class="tw-max-w-sm tw-w-full tw-m-auto"
    >
      <va-card>
        <va-card-content>
          <h1 class="tw-text-xl tw-mb-5 tw-font-bold tw-text-center">Pixel</h1>
          <h3 class="tw-text-xl tw-mb-5 tw-font-bold tw-text-center">
            {{ myPixel.uuid }}
          </h3>
          <div v-if="myPixel.color" class="tw-flex tw-justify-center tw-mb-5">
            <div
              class="tw-h-8 tw-w-8 tw-m-1 tw-mt-2"
              :style="`background-color: ${myPixel.color};`"
            ></div>
          </div>
          <div class="tw-text-xl tw-mb-5 tw-font-bold tw-text-center">
            {{ myPixel.sortitionName }}
          </div>
          <div class="tw-text-md tw-mb-5 tw-font-bold tw-text-center">
            {{ moment(myPixel.sortitionDate).format("DD/MM/yyyy") }}
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from "vue";
import moment from "moment";
import { MyPixelItem } from "@/types/MyPixel";

export default defineComponent({
  name: "my-pixel-list",
  props: {
    myPixelList: {
      required: true,
      type: Object as PropType<MyPixelItem[]>,
      default: null,
    },
  },
  setup() {
    return {
      moment: moment,
    };
  },
});
</script>
