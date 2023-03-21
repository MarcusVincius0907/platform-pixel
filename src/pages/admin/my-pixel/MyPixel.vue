<template>
  <div class="tw-flex tw-justify-center tw-items-center w-full">
    <div class="tw-max-w-2xl tw-w-full">
      <div class="section mb-5">
        <va-card>
          <va-card-content>
            <div
              class="tw-flex tw-justify-center tw-items-center tw-min-h-[100px]"
            >
              <div class="tw-text-center">
                <h1 class="tw-text-xl tw-mb-3 tw-font-bold">Meus Pixels</h1>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>

      <div class="section">
        <div
          class="tw-grid tw-justify-center tw-grid-cols-1 tw-grid-rows-1 md:tw-grid-cols-2 md:tw-grid-rows-2 tw-gap-2"
        >
          <MyPixelList :myPixelList="myPixelList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { ActionTypes } from "@/store/modules/MyPixel/actions";
import MyPixelList from "./MyPixelList.vue";

export default defineComponent({
  name: "my-pixel",
  components: {
    MyPixelList,
  },

  mounted() {
    if (this.$store.state.user?._id)
      {this.$store.dispatch(ActionTypes.GET_MY_PIXEL_LIST);}
  },

  computed: {
    myPixelList() {
      return this.$store.state.MyPixelModule.myPixelList;
    },

    user() {
      return this.$store.state.user?._id;
    },
  },

  watch: {
    user(nValue) {
      if (nValue) {
        this.$store.dispatch(ActionTypes.GET_MY_PIXEL_LIST);
      }
    },
  },
});
</script>
