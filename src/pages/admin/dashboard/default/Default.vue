<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row w-full">
    <div class="left-side tw-p-3 tw-w-full md:tw-w-1/2">
      <div class="section mb-5">
        <va-card>
          <va-card-content>
            <div class="tw-flex tw-justify-center tw-items-center tw-min-h-[100px]">
              <div class="tw-text-center">
                <h1 class="tw-text-3xl tw-mb-3">Olá {{ $store?.state?.user?.name }}!</h1>
                <p class="tw-mb-3">Veja as novidades que temos para você!</p>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
      <div class="section mb-5">
        <div class="tw-flex tw-justify-center tw-items-center">
          <img class="tw-max-w-xl tw-w-full" src="/public/fakePixel.png" alt="" />
        </div>
      </div>
      <div class="section">
        <va-card>
          <va-card-content>
            <div class="tw-flex tw-justify-center">
              <div class="tw-text-center">
                <h1 class="tw-text-xl tw-mb-3 tw-font-bold">Compre agora seus pixels e concorra aos prêmios!</h1>
                <va-button @click="$router.push({ name: 'pixel' })">Comprar</va-button>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>
    <div class="right-side tw-p-3 tw-w-full md:tw-w-1/2">
      <div class="section mb-5">
        <va-card>
          <va-card-content>
            <div class="tw-flex tw-justify-center tw-items-center tw-min-h-[100px]">
              <div class="tw-text-center">
                <h1 class="tw-text-xl tw-mb-3 tw-font-bold">Relação dos próximos sorteios</h1>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
      <div class="section">
        <div
          class="tw-grid tw-justify-center tw-grid-cols-1 tw-grid-rows-1 md:tw-grid-cols-2 md:tw-grid-rows-2 tw-gap-2"
        >
          <SortitionList :sortitions="sortitions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import SortitionList from '@/pages/admin/sortition/SortitionList.vue'
  import { ActionTypes } from '@/store/modules/Sortition/actions'

  export default defineComponent({
    name: 'default',
    components: {
      SortitionList,
    },

    mounted() {
      this.$store.dispatch(ActionTypes.GET_SORTITION_LIST)
    },

    computed: {
      sortitions() {
        return this.$store.state.SortitionModule.sortitionList
      },
    },
  })
</script>
