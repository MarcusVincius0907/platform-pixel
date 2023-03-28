<template>
  <div class="tw-flex tw-justify-center tw-items-center w-full">
    <div class="tw-max-w-2xl tw-w-full">
      <div class="section mb-5">
        <va-card>
          <va-card-content>
            <div class="tw-flex tw-justify-center tw-items-center tw-min-h-[100px]">
              <div class="tw-text-center">
                <h1 class="tw-text-xl tw-mb-3 tw-font-bold">Sorteios</h1>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>

      <div class="section">
        <div class="tw-w-full tw-flex tw-justify-center tw-items-center tw-mb-3">
          <va-button class="tw-w-full" size="large" @click="openModalCreate()">Criar novo sorteio</va-button>
        </div>
        <div
          class="tw-grid tw-justify-center tw-grid-cols-1 tw-grid-rows-1 md:tw-grid-cols-2 md:tw-grid-rows-2 tw-gap-2"
        >
          <SortitionList :sortitions="sortitions" :adminVisibilityAccess="true" @openEditModal="openEditModal" />
        </div>
      </div>
    </div>
    <ModalForm :showModal="showModalForm" :actionType="actionType" :sortition="formData" />
  </div>
</template>

<script lang="ts">
  import { ActionType } from '@/utils/enums'
  import { defineComponent, ref, Ref } from 'vue'
  import ModalForm from './ModalForm.vue'
  import Sortition from '@/types/Sortition'
  import moment from 'moment'
  import { ActionTypes as NFTActionTypes } from '@/store/modules/NFT/actions'
  import { ActionTypes } from '@/store/modules/Sortition/actions'
  import SortitionList from './SortitionList.vue'

  export default defineComponent({
    name: 'sortition',
    components: {
      ModalForm,
      SortitionList,
    },
    setup() {
      return {
        moment: moment,
        formData: ref(),
        actionType: ref(ActionType.CREATE),
        showModalForm: ref(false),
      }
    },
    mounted() {
      this.$store.dispatch(NFTActionTypes.GET_NFT_SUMMARY_ID_LIST)
      this.$store.dispatch(ActionTypes.GET_SORTITION_LIST)
    },
    methods: {
      openModalCreate() {
        this.changeActionType(ActionType.CREATE)
        this.showModalForm = !this.showModalForm
        this.formData = {}
      },
      openEditModal(sortition: Sortition) {
        this.formData = { ...sortition, date: new Date(sortition.date) }
        this.changeActionType(ActionType.EDIT)
        this.showModalForm = !this.showModalForm
      },
      changeActionType(type: ActionType) {
        this.actionType = type
      },
      goToNFT(nftId: string) {
        this.$router.push({ name: 'NFT', query: { nftId } })
      },
    },

    computed: {
      sortitions() {
        return this.$store.state.SortitionModule.sortitionList
      },
    },
  })
</script>
