<template>
  <div class="tw-flex tw-justify-center tw-items-center w-full">
    <div class="tw-max-w-2xl tw-w-full">
      <div class="section mb-5">
        <va-card>
          <va-card-content>
            <div class="tw-flex tw-justify-center tw-items-center tw-min-h-[100px]">
              <div class="tw-text-center">
                <h1 class="tw-text-xl tw-mb-3 tw-font-bold">Meus Pixels</h1>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>

      <div class="section">
        <MyPixelList v-if="myPixelList && myPixelList.length > 0" :myPixelList="myPixelList" />
        <div v-else>
          <div>Você não tem nenhum pixel ainda, clique aqui para comprar:</div>
          <va-button @click="goToBuyPixel()" class="tw-mt-3">Compre pixels</va-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue'
  import { ActionTypes } from '@/store/modules/MyPixel/actions'
  import MyPixelList from './MyPixelList.vue'

  export default defineComponent({
    name: 'my-pixel',
    components: {
      MyPixelList,
    },

    mounted() {
      if (this.$store.state.user?._id) {
        this.$store.dispatch(ActionTypes.GET_MY_PIXEL_LIST)
      }
    },

    methods: {
      goToBuyPixel() {
        this.$router.push({ name: 'pixel' })
      },
    },

    computed: {
      myPixelList() {
        return this.$store.state.MyPixelModule.myPixelList
      },

      user() {
        return this.$store.state.user?._id
      },
    },

    watch: {
      user(nValue) {
        if (nValue) {
          this.$store.dispatch(ActionTypes.GET_MY_PIXEL_LIST)
        }
      },
    },
  })
</script>
